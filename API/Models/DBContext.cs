using Microsoft.EntityFrameworkCore;

namespace API_Cerrillos.Models
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
        }

        public DbSet<Eventos> Eventos { get; set; }
        public DbSet<Cuentas> Cuentas { get; set; }
    }
}
