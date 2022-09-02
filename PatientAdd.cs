using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Contoso
{
    public static class PatientAdd
    {
        [FunctionName("PatientAdd")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            var fields = data?.analyzeResult?.documents[0]?.fields;

            var iso = getValue(fields, "iso");
            var family_name = getValue(fields, "family_name");
            var given_names = getValue(fields, "given_names");
            
            var address_unit = getValue(fields, "address_unit");
            var address_number = getValue(fields, "address_number");
            var address_street = getValue(fields, "address_street");
            var address_city = getValue(fields, "address_city");
            var address_state = getValue(fields, "address_state");
            var email = getValue(fields, "email");
            var phone = getValue(fields, "phone");

            var emergency_name = getValue(fields, "emergency_name");
            var emergency_relationship = getValue(fields, "emergency_relationship");
            var emergency_phone = getValue(fields, "emergency_phone");
            var emergency_email = getValue(fields, "emergency_email");

            var allergy_1 = getValue(fields, "allergy_1");
            var allergy_2 = getValue(fields, "allergy_2");
            var allergy_3 = getValue(fields, "allergy_3");
            var reaction_1 = getValue(fields, "reaction_1");
            var reaction_2 = getValue(fields, "reaction_2");
            var reaction_3 = getValue(fields, "reaction_3");

            var date = getValue(fields, "date");

            var patient = new Patient
            {
                iso = iso,
                family_name = family_name,
                given_names = given_names,
                address_unit = address_unit,
                address_number = address_number,
                address_street = address_street,
                address_city = address_city,
                address_state = address_state,
                email = email,
                phone = phone,
                emergency_name = emergency_name,
                emergency_relationship = emergency_relationship,
                emergency_phone = emergency_phone,
                emergency_email = emergency_email,
                allergy_1 = allergy_1,
                allergy_2 = allergy_2,
                allergy_3 = allergy_3,
                reaction_1 = reaction_1,
                reaction_2 = reaction_2,
                reaction_3 = reaction_3,
                date = date
            };

            string responseMessage = string.IsNullOrEmpty(given_names)
                ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
                : $"Hello, {given_names}. This HTTP triggered function executed successfully.";

            return new OkObjectResult(responseMessage);
        }

        private static string getValue(dynamic fields, string key){
            return fields[key]["content"].ToString();
        }

    }
}
