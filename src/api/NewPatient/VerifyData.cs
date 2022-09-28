using System.Threading.Tasks;
using Contoso.Healthcare.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Newtonsoft.Json;

namespace Contoso.Healthcare.Api.NewPatient;

public static class VerifyData
{
    [FunctionName($"{nameof(VerifyData)}-{nameof(GetPatientRawData)}")]
    public static IActionResult GetPatientRawData(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "new-patient/{patientId}")] HttpRequest req,
        [CosmosDB(
                databaseName: "patientDb",
                collectionName: "patientContainer",
                ConnectionStringSetting = "COSMOS_DB",
                Id = "{patientId}:raw",
                PartitionKey = "{patientId}:raw")]FormRecognizerResponse patient)
    {
        if (patient == null)
        {
            return new NotFoundResult();
        }

        return new OkObjectResult(patient);
    }

    [FunctionName($"{nameof(VerifyData)}-{nameof(SavePatientData)}")]
    public static async Task<IActionResult> SavePatientData(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "new-patient/{patientId}")] HttpRequest req,
        [CosmosDB(
                databaseName: "patientDb",
                collectionName: "patientContainer",
                ConnectionStringSetting = "COSMOS_DB")]IAsyncCollector<Patient> patientCollector,
        string patientId)
    {
        var patient = JsonConvert.DeserializeObject<Patient>(await req.ReadAsStringAsync());
        patient.Id = Patient.GetId(patientId);
        await patientCollector.AddAsync(patient);

        return new OkObjectResult(patient);
    }
}