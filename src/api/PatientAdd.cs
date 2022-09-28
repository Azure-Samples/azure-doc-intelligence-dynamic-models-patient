using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Contoso
{
    public static class PatientAdd
    {
        [FunctionName("PatientAdd")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req, ILogger log, [CosmosDB(
                databaseName: "patientDb",
                collectionName: "patientContainer",
                ConnectionStringSetting = "COSMOS_DB")]IAsyncCollector<dynamic> patientData)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            var fields = data?.analyzeResult?.documents[0]?.fields;

            var iso = getValue(fields, "iso");
            var family_name = getValue(fields, "family_name");
            var given_names = getValue(fields, "given_names");
            var date_of_birth = getValue(fields, "date_of_birth");

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
                Iso = iso,
                FamilyName = family_name,
                GivenNames = given_names,
                DateOfBirth = date_of_birth,
                AddressUnit = address_unit,
                AddressNumber = address_number,
                AddressStreet = address_street,
                AddressCity = address_city,
                AddressState = address_state,
                Email = email,
                Phone = phone,
                EmergencyName = emergency_name,
                EmergencyRelationship = emergency_relationship,
                EmergencyPhone = emergency_phone,
                EmergencyEmail = emergency_email,
                Allergies=new List<Allergy>
                {
                    new Allergy{Reaction=reaction_1,Medication=allergy_1},
                    new Allergy{Reaction=reaction_2,Medication=allergy_2},
                    new Allergy{Reaction=reaction_3,Medication=allergy_3},
                },
                Date = date,

            };

            await patientData.AddAsync(patient);

            string responseMessage = string.IsNullOrEmpty(given_names)
                ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
                : $"Hello, {given_names}. This HTTP triggered function executed successfully.";

            return new OkObjectResult(patient);
        }

        private static string getValue(dynamic fields, string key)
        {
            return fields[key]["valueString"].ToString();
        }

    }
}
