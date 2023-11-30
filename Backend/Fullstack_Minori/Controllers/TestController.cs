using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Fullstack_Minori.Controllers
{

    [Route("api/data")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [EnableCors("MyAllowSpecificOrigins")]
        [HttpGet]
        public IActionResult GetData()
        {
            // データを生成または取得するロジックを実装
            var data = "これはC#からのデータです";

            return Ok(new { data });
        }
    }
}

