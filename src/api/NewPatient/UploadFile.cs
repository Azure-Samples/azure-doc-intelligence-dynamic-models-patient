using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Contoso.Healthcare.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contoso.Healthcare.Api.NewPatient;

public static class UploadFile
{
    [FunctionName(nameof(UploadFile))]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "new-patient/upload-file")] HttpRequest req,
        [Blob("unprocessed-patient-forms", Connection = "NEW_PATIENT_STORAGE")] BlobContainerClient containerClient,
        [CosmosDB(
                databaseName: "patientDb",
                collectionName: "patientContainer",
                ConnectionStringSetting = "COSMOS_DB")]IAsyncCollector<FormRecognizerResponse> formResponse,
        ILogger log)
    {
        var formData = await req.ReadFormAsync();
        var file = formData.Files["file"];

        var (patientId, filename) = await StoreFile(file, containerClient);
        var outputs = await ExtractFormInfo(containerClient, filename);

        await formResponse.AddAsync(new FormRecognizerResponse(FormRecognizerResponse.GetId(patientId), outputs));

        return new OkObjectResult(new { PatientId = patientId });
    }

    private static async Task<Dictionary<string, (string, float?)>> ExtractFormInfo(BlobContainerClient containerClient, string filename)
    {
        string? endpoint = Environment.GetEnvironmentVariable("FORM_RECOGNIZER_ENDPOINT");
        string? apiKey = Environment.GetEnvironmentVariable("FORM_RECOGNIZER_API_KEY");
        string? modelId = Environment.GetEnvironmentVariable("FORM_RECOGNIZER_MODEL_ID");

        if (string.IsNullOrEmpty(endpoint) || string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(modelId))
        {
            throw new InvalidOperationException("Missing environment variables");
        }

        var credential = new AzureKeyCredential(apiKey);
        var client = new DocumentAnalysisClient(new Uri(endpoint), credential);

        var blobClient = containerClient.GetBlobClient(filename);
        var uri = blobClient.GenerateSasUri(BlobSasPermissions.Read, DateTimeOffset.UtcNow.AddMinutes(5));

        AnalyzeDocumentOperation operation = await client.AnalyzeDocumentFromUriAsync(WaitUntil.Completed, modelId, uri);
        AnalyzeResult result = operation.Value;

        var outputs = new Dictionary<string, (string, float?)>();

        foreach (AnalyzedDocument document in result.Documents)
        {
            foreach ((string fieldName, DocumentField field) in document.Fields)
            {
                outputs.Add(fieldName, (field.Content, field.Confidence));
            }
        }

        return outputs;
    }

    private static async Task<(string, string)> StoreFile(IFormFile file, BlobContainerClient containerClient)
    {
        _ = await containerClient.CreateIfNotExistsAsync();

        var patientId = Guid.NewGuid().ToString();

        var name = $"{patientId}_{file.FileName}";
        _ = await containerClient.UploadBlobAsync(name, file.OpenReadStream());

        return (patientId, name);
    }
}