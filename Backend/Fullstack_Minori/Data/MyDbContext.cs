using Fullstack_Minori.Model;
using Microsoft.EntityFrameworkCore;

namespace Fullstack_Minori.Data
{

    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Content> Contents { get; set; }



    }
}

