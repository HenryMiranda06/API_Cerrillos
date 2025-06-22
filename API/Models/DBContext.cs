using Microsoft.EntityFrameworkCore;
using System.Linq; // Necesario para Linq (AnyAsync, etc.)

namespace API_Cerrillos.Models
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
        }

        public DbSet<Eventos> Eventos { get; set; }
        public DbSet<Cuentas> Cuentas { get; set; }
        public DbSet<Categorias> Categorias { get; set; }
        public DbSet<CategoriaEvento> CategoriaEvento { get; set; } // DbSet para la tabla de unión

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configura la clave primaria compuesta para CategoriaEvento
            modelBuilder.Entity<CategoriaEvento>()
                .HasKey(ce => new { ce.ID_Evento, ce.ID_Categoria });

            // Configura la relación Many-to-Many entre Eventos y Categorias a través de CategoriaEvento
            modelBuilder.Entity<CategoriaEvento>()
                .HasOne(ce => ce.Evento)           // Un CategoriaEvento tiene un Evento
                .WithMany(e => e.CategoriaEventos) // Un Evento tiene muchas entradas en CategoriaEvento
                .HasForeignKey(ce => ce.ID_Evento); // La clave foránea en CategoriaEvento es ID_Evento

            modelBuilder.Entity<CategoriaEvento>()
                .HasOne(ce => ce.Categoria)          // Un CategoriaEvento tiene una Categoría
                .WithMany(c => c.CategoriaEventos)   // Una Categoría tiene muchas entradas en CategoriaEvento
                .HasForeignKey(ce => ce.ID_Categoria); // La clave foránea en CategoriaEvento es ID_Categoria

            // Configuración de la relación de Eventos con Cuentas (clave foránea 'Correo')
            

            base.OnModelCreating(modelBuilder);
        }
    }
}