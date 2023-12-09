using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Fullstack_Minori.Controllers
{
    [ApiController]
    [Route("/api/data")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        [EnableCors("CorsPolicy")]
        public IActionResult GetData()
        {
            // データを生成または取得するロジックを実装
            var data = "これはC#からのデータです";

            return Ok(data);
        }
    }
}

