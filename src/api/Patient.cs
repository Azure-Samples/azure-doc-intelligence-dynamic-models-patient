using Newtonsoft.Json;

namespace Contoso
{
    internal class Patient
    {
        public string Iso { get; set; }
        [JsonProperty("family_name")]
        public string FamilyName { get; set; }
        [JsonProperty("given_names")]
        public string GivenNames { get; set; }
        [JsonProperty("date_of_birth")]
        public string DateOfBirth { get; set; }
        [JsonProperty("address_unit")]
        public string AddressUnit { get; set; }
        [JsonProperty("address_number")]
        public string AddressNumber { get; set; }
        [JsonProperty("address_street")]
        public string AddressStreet { get; set; }
        [JsonProperty("address_suburb")]
        public string AddressCity { get; set; }
        [JsonProperty("address_state")]
        public string AddressState { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        [JsonProperty("emergency_name")]
        public string EmergencyName { get; set; }
        [JsonProperty("emergency_relationship")]
        public string EmergencyRelationship { get; set; }
        [JsonProperty("emergency_phone")]
        public string EmergencyPhone { get; set; }
        [JsonProperty("emergency_email")]
        public string EmergencyEmail { get; set; }
        [JsonProperty("allergy_1")]
        public string Allergy1 { get; set; }
        [JsonProperty("allergy_2")]
        public string Allergy2 { get; set; }
        [JsonProperty("allergy_3")]
        public string Allergy3 { get; set; }
        [JsonProperty("reaction_1")]
        public string Reaction1 { get; set; }
        [JsonProperty("reaction_2")]
        public string Reaction2 { get; set; }
        [JsonProperty("reaction_3")]
        public string Reaction3 { get; set; }
        public string Date { get; set; }
    }
}