using System.ComponentModel.DataAnnotations;

namespace graduation3.Model
{
    public class User


    {

        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }
}
