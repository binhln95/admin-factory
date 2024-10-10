using Microsoft.AspNetCore.Mvc;

namespace AdminApi.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return Ok("ok");
        }
    }
}
