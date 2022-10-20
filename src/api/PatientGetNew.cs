using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Contoso.Healthcare.Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace Contoso.Healthcare.Api
{
    public static class PatientGetNew
    {
        [FunctionName(nameof(PatientGetNew))]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "surgery/new-patients")] HttpRequest req,
            [CosmosDB(
                databaseName: "patientDb",
                collectionName: "patientContainer",
                ConnectionStringSetting = "COSMOS_DB",
                SqlQuery = "SELECT * FROM c WHERE c.IsApproved = false")] IEnumerable<Patient> patients) =>
                    new OkObjectResult(patients.Select(p => p with { Id = p.Id.Split(':')[0] }));
    }
}
