using Microsoft.AspNetCore.Mvc;

namespace Angular.Intro.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();
        public IActionResult Error() => View();
    }
}
