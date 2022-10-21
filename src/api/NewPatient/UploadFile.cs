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
        // TODO: Call Azure Form Recognizer
        throw new NotImplementedException("Exercise for the reader");
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