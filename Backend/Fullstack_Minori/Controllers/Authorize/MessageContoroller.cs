﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;


namespace Fullstack_Minori.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]

    [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]

    public class MessasgeController : ControllerBase
    {
        private static readonly string[] Employees = new[] { "Minori Hayashi" };


        [Authorize(Roles = "Admin")]
        [HttpGet("employees")] // Add this
        public IActionResult GetEmployees()
        {
            return Ok(Employees);
        }

        [Authorize] // Add this
        [HttpGet("total-employees")]
        public IActionResult TotalEmployees()
        {
            return Ok(Employees.Length);
        }
    }
}
