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

namespace Contoso
{
    public static class PatientApproved
    {
        [FunctionName("PatientApproved")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "PatientApproved/{id}")] HttpRequest req, ILogger log, ExecutionContext context, string id)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var config = new ConfigurationBuilder().SetBasePath(context.FunctionAppDirectory).AddJsonFile("local.settings.json", optional: true, reloadOnChange: true).AddEnvironmentVariables().Build();

            var endPointUrl = config["CosmosDBEndPoint"];
            var connectionString = config["ConnectionStrings:COSMOS_DB"];

            using (var client = new CosmosClient(connectionString))
            {
                var database = client.GetDatabase("patientDb");
                var container = database.GetContainer("patientContainer");

                // update the patient
                var patient = await container.ReadItemAsync<Patient>(id, new PartitionKey(id));
                var patientToUpdate = patient.Resource;
                patientToUpdate.IsApproved = true;
                await container.ReplaceItemAsync<Patient>(patientToUpdate, id, new PartitionKey(id));

                return new OkObjectResult(patientToUpdate);
                
            }
        }
    }
}
