using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API_Cerrillos.Models
{
    public class Categorias
    {
        [Key]
        public int ID_Categoria { get; set; }
        public string NombreCategoria { get; set; } // O como se llame tu columna de nombre de categoría

        // Propiedad de navegación para la relación Muchos a Muchos con Eventos
        // A través de la tabla de unión CategoriaEvento
        public ICollection<CategoriaEvento> CategoriaEventos { get; set; } = new List<CategoriaEvento>();
    }
}