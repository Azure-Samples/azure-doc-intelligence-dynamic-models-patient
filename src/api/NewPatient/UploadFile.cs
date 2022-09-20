using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
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
        ILogger log)
    {
        var formData = await req.ReadFormAsync();
        var file = formData.Files["file"];

        var filename = await StoreFile(file, containerClient);
        var outputs = await ExtractFormInfo(containerClient, log, filename);

        return new OkObjectResult(outputs);
    }

    private static async Task<Dictionary<string, (string, float?)>> ExtractFormInfo(BlobContainerClient containerClient, ILogger log, string filename)
    {
        string endpoint = Environment.GetEnvironmentVariable("FORM_RECOGNIZER_ENDPOINT");
        string apiKey = Environment.GetEnvironmentVariable("FORM_RECOGNIZER_API_KEY");
        string modelId = Environment.GetEnvironmentVariable("FORM_RECOGNIZER_MODEL_ID");

        var credential = new AzureKeyCredential(apiKey);
        var client = new DocumentAnalysisClient(new Uri(endpoint), credential);

        var blobClient = containerClient.GetBlobClient(filename);
        var uri = blobClient.GenerateSasUri(BlobSasPermissions.Read, DateTimeOffset.UtcNow.AddMinutes(5));

        AnalyzeDocumentOperation operation = await client.AnalyzeDocumentFromUriAsync(WaitUntil.Completed, modelId, uri);
        AnalyzeResult result = operation.Value;

        var outputs = new Dictionary<string, (string, float?)>();

        foreach (AnalyzedDocument document in result.Documents)
        {
            log.LogInformation($"Document of type: {document.DocumentType}");

            foreach (KeyValuePair<string, DocumentField> fieldKvp in document.Fields)
            {
                string fieldName = fieldKvp.Key;
                DocumentField field = fieldKvp.Value;

                log.LogInformation($"Field '{fieldName}': ");

                log.LogInformation($"  Content: '{field.Content}'");
                log.LogInformation($"  Confidence: '{field.Confidence}'");

                outputs.Add(fieldName, (field.Content, field.Confidence));
            }
        }

        return outputs;
    }

    private static async Task<string> StoreFile(IFormFile file, BlobContainerClient containerClient)
    {
        _ = await containerClient.CreateIfNotExistsAsync();

        var instanceId = Guid.NewGuid().ToString();

        var name = $"{instanceId}_{file.FileName}";
        _ = await containerClient.UploadBlobAsync(name, file.OpenReadStream());

        return name;
    }
}