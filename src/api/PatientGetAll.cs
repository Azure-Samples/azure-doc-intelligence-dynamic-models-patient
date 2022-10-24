using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Contoso.Healthcare.Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace Contoso.Healthcare.Api
{
    public static class PatientGetAll
    {
        [FunctionName(nameof(PatientGetAll))]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "patient")] HttpRequest req,
            [CosmosDB(
                databaseName: "patientDb",
                collectionName: "patientContainer",
                ConnectionStringSetting = "COSMOS_DB",
                SqlQuery = "SELECT * FROM c WHERE c.IsApproved = true")] IEnumerable<Patient> patients) =>
                    new OkObjectResult(patients.Select(p => p with { Id = p.Id.Split(':')[0] }));
    }
}
