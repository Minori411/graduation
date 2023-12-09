using System.ComponentModel.DataAnnotations;

namespace Fullstack_Minori.Model
{
    public class Message
    {
        [Key]
        public Int32 Id { get; set; }
        public string? text { get; set; }
    }
}
