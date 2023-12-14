using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;


namespace Fullstack_Minori.Controllers
{
    [Route("/api/Employees")]
    [ApiController]

    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]

    public class EmployeesController : ControllerBase
    {
        private static readonly string[] Employees = new[] { "Minori Hayashi", "Hatasako", "Minori", "Hiroko" };


        [Authorize(Roles = "Admin")]
        [HttpGet("employees")] // Add this
        [EnableCors("CorsPolicy")]
        public IActionResult GetEmployees()
        {
            return Ok(Employees);
        }

        [Authorize] // Add this
        [HttpGet("total-employees")]
        [EnableCors("CorsPolicy")]
        public IActionResult TotalEmployees()
        {
            return Ok(Employees.Length);
        }
    }
}
