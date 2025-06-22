using System.ComponentModel.DataAnnotations;

namespace API_Cerrillos.Models
{
    public class Eventos
    {
        [Key]
        public int ID_Evento { get; set; }

        public string TituloEvento { get; set; }

        public int Categoria { get; set; }

        public string Descripcion { get; set; }

        public DateTime FechaEvento { get; set; }

        public TimeOnly HoraInicio { get; set; }

        public string Lugar { get; set; }

        public byte[] Imagen { get; set; }

        public string InfoContacto { get; set; }

        public string Notas { get; set; }

        public string Correo { get; set; }

        public string Transporte { get; set; }

        public string Estado { get; set; }
        public ICollection<CategoriaEvento> CategoriaEventos { get; set; } = new List<CategoriaEvento>();
    }
}
