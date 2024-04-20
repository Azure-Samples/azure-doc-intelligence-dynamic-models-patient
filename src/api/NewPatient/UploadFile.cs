using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;
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
        [CosmosDB(
                databaseName: "patientDb",
                containerName: "patientContainer",
                Connection = "COSMOS_DB")]IAsyncCollector<FormRecognizerResponse> formResponse,
        ILogger log)
    {
        var formData = await req.ReadFormAsync();
        var file = formData.Files["file"];

        if (file == null)
        {
            return new BadRequestObjectResult("File not found");
        }

        string patientId = Guid.NewGuid().ToString();
        var outputs = await ExtractFormInfo(file);

        await formResponse.AddAsync(new FormRecognizerResponse(FormRecognizerResponse.GetId(patientId), outputs));

        return new OkObjectResult(new { PatientId = patientId });
    }

    private static async Task<Dictionary<string, (string, float?)>> ExtractFormInfo(IFormFile file)
    {
        // TODO: Call Azure Form Recognizer
        throw new NotImplementedException("Exercise for the reader");
    }
}