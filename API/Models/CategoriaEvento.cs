using System.ComponentModel.DataAnnotations.Schema; // Para [ForeignKey]

namespace API_Cerrillos.Models
{
    // Este modelo representa la tabla de unión Many-to-Many
    public class CategoriaEvento
    {
        // Propiedad de clave foránea para el Evento
        public int ID_Evento { get; set; }
        [ForeignKey("ID_Evento")] // Indica que ID_Evento es una FK a la tabla Eventos
        public Eventos Evento { get; set; } // Propiedad de navegación al Evento

        // Propiedad de clave foránea para la Categoría
        public int ID_Categoria { get; set; }
        [ForeignKey("ID_Categoria")] // Indica que ID_Categoria es una FK a la tabla Categorias
        public Categorias Categoria { get; set; } // Propiedad de navegación a la Categoría
    }
}