using System.ComponentModel.DataAnnotations;

namespace Fullstack_Minori.Model
{
    public class Content
    {

        [Key]
        public Int32 Id { get; set; }
        public string Task { get; set; }
        public string? Detail { get; set; }
        public DateTime Deadline { get; set; }
        public bool IsComplete { get; set; }
        public string? Tags { get; set; }

    }
}
