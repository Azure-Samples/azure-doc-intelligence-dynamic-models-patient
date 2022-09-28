using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Azure.Cosmos;
using Contoso.Healthcare.Api.Models;

namespace Contoso
{
    public static class PatientGetNew
    {
        [FunctionName("PatientGetNew")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "patient/new")] HttpRequest req, ILogger log, ExecutionContext context)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var config = new ConfigurationBuilder().SetBasePath(context.FunctionAppDirectory).AddJsonFile("local.settings.json", optional: true, reloadOnChange: true).AddEnvironmentVariables().Build();

            var endPointUrl = config["CosmosDBEndPoint"];
            var connectionString = config["ConnectionStrings:COSMOS_DB"];

            using (var client = new CosmosClient(connectionString))
            {
                var database = client.GetDatabase("patientDb");
                var container = database.GetContainer("patientContainer");

                // get patients that are not approved
                var sqlQueryText = "SELECT * FROM c WHERE c.IsApproved = false";
                var queryDefinition = new QueryDefinition(sqlQueryText);
                var iterator = container.GetItemQueryIterator<Patient>(queryDefinition);
                var results = new System.Collections.Generic.List<Patient>();
                while (iterator.HasMoreResults)
                {
                    var response = await iterator.ReadNextAsync();
                    results.AddRange(response.Resource);
                }

                return new OkObjectResult(results);

            }

        }
    }
}
