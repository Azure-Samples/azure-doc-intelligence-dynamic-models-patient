using System.Collections.Generic;
using Newtonsoft.Json;

namespace Contoso.Healthcare.Api.Models
{
    public class Allergy
    {
        public string? Medication { get; set; }
        public string? Reaction { get; set; }
    }

    public enum Gender
    {
        Male, Female, Queer, Decline, MTF, FTM
    }

    public enum Pronouns
    {
        He, She, They, Other
    }

    public class Patient
    {
        [JsonProperty("id")]
        public string Id { get; set; } = "";
        public string? Iso { get; set; }
        public string? FamilyName { get; set; }
        public string? GivenNames { get; set; }
        public string? DateOfBirth { get; set; }
        public string? AddressUnit { get; set; }
        public string? AddressNumber { get; set; }
        public string? AddressStreet { get; set; }
        public string? AddressCity { get; set; }
        public string? AddressState { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? EmergencyName { get; set; }
        public string? EmergencyRelationship { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? EmergencyEmail { get; set; }
        public List<Allergy> Allergies { get; set; } = new();
        public string? Date { get; set; }
        public string? AddressPostcode { get; internal set; }
        public List<Gender> Gender { get; set; } = new();
        public List<Pronouns> Pronouns { get; set; } = new();
        public string? PronounsOther { get; set; }
        public bool IsApproved { get; set; }

        public static string GetId(string patiendId) => $"{patiendId}:complete";
    }
}