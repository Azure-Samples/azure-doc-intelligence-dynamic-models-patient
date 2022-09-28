using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Contoso.Healthcare.Api.Models;

namespace Contoso.Healthcare.Api
{
    public static class PatientApproved
    {
        [FunctionName(nameof(PatientApproved))]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "POST", Route = "patient/{id}/approve")] HttpRequest req,
            [CosmosDB(
                databaseName: "patientDb",
                collectionName: "patientContainer",
                ConnectionStringSetting = "COSMOS_DB",
                Id = "{id}:complete",
                PartitionKey = "{id}:complete")] Patient? patient,
            [CosmosDB(
                databaseName: "patientDb",
                collectionName: "patientContainer",
                ConnectionStringSetting = "COSMOS_DB")] out Patient? updatedPatient)
        {
            if (patient == null)
            {
                updatedPatient = null;
                return new NotFoundResult();
            }

            updatedPatient = patient;
            updatedPatient.IsApproved = true;

            return new OkResult();
        }
    }
}
