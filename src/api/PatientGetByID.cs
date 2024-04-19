using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Contoso.Healthcare.Api.Models;

namespace Contoso.Healthcare.Api
{
    public static class PatientGetByID
    {
        [FunctionName(nameof(PatientGetByID))]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "patient/{id}")] HttpRequest req,
            [CosmosDB(
                databaseName: "patientDb",
                containerName: "patientContainer",
                Connection = "COSMOS_DB",
                Id = "{id}:complete",
                PartitionKey = "{id}:complete")] Patient? patient) => patient == null ? new NotFoundResult() : new OkObjectResult(patient);
    }
}
