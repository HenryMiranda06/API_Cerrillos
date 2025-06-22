using System;
using System.Collections.Generic;

namespace API_Cerrillos.Models
{
    // DTO para la salida (lectura) de Eventos
    public class EventoGetDTO
    {
        public int ID_Evento { get; set; }
        public string TituloEvento { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaEvento { get; set; }
        public TimeOnly HoraInicio { get; set; }
        public string Lugar { get; set; }
        public string ImagenBase64 { get; set; } // Representa la imagen como Base64 para la salida
        public string InfoContacto { get; set; }
        public string Notas { get; set; }
        public string Estado { get; set; }
        public string Transporte { get; set; }
        public string Correo { get; set; } // El correo del usuario asociado al evento

  


    }
}