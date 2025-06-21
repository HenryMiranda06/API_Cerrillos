using System.ComponentModel.DataAnnotations;

namespace API_Cerrillos.Models
{
    public class Cuentas
    {
        [Key]
        public string Correo { get; set; }

        public string Contraseña { get; set; }
    }
}
