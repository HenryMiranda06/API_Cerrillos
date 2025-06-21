using Microsoft.AspNetCore.Mvc;
using API_Cerrillos.Models;
using Microsoft.EntityFrameworkCore;

namespace API_Cerrillos.Controllers
{
    [Route("api/Cuentas")]
    [ApiController]
    public class CuentasController : Controller
    {
        private readonly DBContext _context;

        public CuentasController(DBContext context)
        {
            _context = context;
        }

        [HttpPost("VerificarCredenciales")]
        public async Task<IActionResult> VerificarCredenciales(Cuentas cuenta)
        {
            try
            {
                var usuario = await _context.Cuentas.FirstOrDefaultAsync(c => c.Correo == cuenta.Correo && c.Contraseña == cuenta.Contraseña);
                if (usuario != null)
                {
                    return Ok("Credenciales validas");
                }
                return NotFound();
            }
            catch (Exception cx)
            {
                return BadRequest(cx.Message.ToString());
            }

        }


    }
}
