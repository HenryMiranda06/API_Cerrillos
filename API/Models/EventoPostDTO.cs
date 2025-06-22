using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API_Cerrillos.Models
{
    public class EventoPostDTO
    {
        [Required(ErrorMessage = "El título del evento es obligatorio.")]
        [StringLength(200, ErrorMessage = "El título no puede exceder los 200 caracteres.")]
        public string TituloEvento { get; set; }

        [Required(ErrorMessage = "El ID de categoría es obligatorio.")]
        public int ID_Categoria { get; set; } 

        [Required(ErrorMessage = "La descripción es obligatoria.")]
        public string Descripcion { get; set; }

        [Required(ErrorMessage = "La fecha del evento es obligatoria.")]
        [DataType(DataType.Date)]
        public DateTime FechaEvento { get; set; }

        [Required(ErrorMessage = "La hora de inicio es obligatoria.")]
        public TimeOnly HoraInicio { get; set; }

        [Required(ErrorMessage = "El lugar es obligatorio.")]
        [StringLength(50, ErrorMessage = "El lugar no puede exceder los 50 caracteres.")]
        public string Lugar { get; set; }

        public string ImagenBase64 { get; set; }

        [StringLength(100, ErrorMessage = "La información de contacto no puede exceder los 100 caracteres.")]
        public string InfoContacto { get; set; }

        [StringLength(100, ErrorMessage = "Las notas no pueden exceder los 100 caracteres.")]
        public string Notas { get; set; }

        [Required(ErrorMessage = "El estado es obligatorio.")]
        [StringLength(30, ErrorMessage = "El estado no puede exceder los 30 caracteres.")]
        public string Estado { get; set; }

        [Required(ErrorMessage = "El transporte es obligatorio.")]
        [StringLength(30, ErrorMessage = "El transporte no puede exceder los 30 caracteres.")]
        public string Transporte { get; set; }

        [Required(ErrorMessage = "El correo de contacto es obligatorio.")]
        [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
        public string Correo { get; set; }
    }
}