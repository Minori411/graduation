using Microsoft.EntityFrameworkCore;
using graduation3.Model;

namespace graduation3.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }


        public DbSet<User> Users { get; set; }



    }
}
