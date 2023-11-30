using System.ComponentModel.DataAnnotations;

namespace Fullstack_Minori.Model
{
    public class User
    {


        [Key]
        public Int32 PK { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

    }
}
