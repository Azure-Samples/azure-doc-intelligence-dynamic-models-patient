using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.IO;

namespace Contoso.Healthcare.Api.NewPatient;

public static class UploadFile
{
    [FunctionName("new-patient/upload-file")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req, [Blob("unprocessed-patient-forms/{name}", FileAccess.Write)] Stream form, ILogger log)
    {
        var formData = await req.ReadFormAsync();
        var file = formData.Files["file"];

        file.CopyTo(form);

        return new OkObjectResult(new { file.FileName, file.Length });
    }
}