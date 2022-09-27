using System.Collections.Generic;
using Newtonsoft.Json;

namespace Contoso.Healthcare.Api.Models;

public record FormRecognizerResponse([property: JsonProperty("id")] string Id, Dictionary<string, (string, float?)> Fields)
{
    public static string GetId(string patiendId) => $"{patiendId}:raw";
}
