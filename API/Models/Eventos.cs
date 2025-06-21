using System.ComponentModel.DataAnnotations;

namespace API_Cerrillos.Models
{
    public class Eventos
    {
        [Key]
        public int ID_Evento { get; set; }

        public string TituloEvento { get; set; }

        public string Categoria { get; set; }

        public string Descripcion { get; set; }

        public DateTime FechaEvento { get; set; }

        public TimeOnly HoraInicio { get; set; }

        public string Lugar { get; set; }

        public byte[] Imagen { get; set; }

        public string InfoContacto { get; set; }

        public string Notas { get; set; }
    }
}
