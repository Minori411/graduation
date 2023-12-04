using Fullstack_Minori.Data;
using Fullstack_Minori.Model;
using Microsoft.AspNetCore.Mvc;

namespace Fullstack_Minori.Controllers
{
    [ApiController]
    [Route("/api/content")]
    public class ContentController : ControllerBase
    {
        private MyDbContext _context;

        public ContentController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {

            var contents = _context.Contents.ToList();
            return Ok(contents);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Content newContent) // リクエストボディからデシリアライズ
        {
            if (!ModelState.IsValid)
            {
                var errorMessages = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                // エラーメッセージを文字列として結合
                var errorMessage = string.Join(", ", errorMessages);

                return BadRequest(errorMessage);
            }

            _context.Contents.Add(newContent);
            _context.SaveChanges();

            return Ok(newContent);
        }

        [HttpPut]
        public IActionResult Put(int key, [FromBody] Content updatedContent) // リクエストボディからデシリアライズ
        {
            var content = _context.Contents.FirstOrDefault(c => c.Id == key);

            if (content == null)
            {
                return NotFound();
            }


            content.Id = updatedContent.Id;
            content.Task = updatedContent.Task;
            content.Detail = updatedContent.Detail;
            content.Deadline = updatedContent.Deadline;
            content.IsComplete = updatedContent.IsComplete;
            content.Tags = updatedContent.Tags;

            if (!ModelState.IsValid)
            {
                var errorMessages = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                // エラーメッセージを文字列として結合
                var errorMessage = string.Join(", ", errorMessages);

                return BadRequest(errorMessage);
            }

            _context.SaveChanges();

            return Ok(content);
        }

        [HttpDelete("{key}")]
        public IActionResult Delete(int key)
        {
            var content = _context.Contents.FirstOrDefault(c => c.Id == key);

            if (content == null)
            {
                return NotFound();
            }

            _context.Contents.Remove(content);
            _context.SaveChanges();

            return NoContent(); // 削除成功時に204 No Contentを返す
        }
    }
}