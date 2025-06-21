using Microsoft.AspNetCore.Mvc;

namespace Proyecto_Compromiso_Social.Controllers
{
    public class CuentasController : Controller
    {
        public IActionResult AdminDashboard()
        {
            return View();
        }
    }
}
