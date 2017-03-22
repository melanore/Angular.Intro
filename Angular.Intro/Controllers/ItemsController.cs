using System;
using System.Collections.Generic;
using System.Linq;
using Angular.Intro.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Angular.Intro.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        private static JsonSerializerSettings DefaultJsonSettings
            => new JsonSerializerSettings { Formatting = Formatting.Indented };

        private static int DefaultNumberOfItems => 5;
        private static int MaxNumberOfItems => 100;

        [HttpGet]
        public IActionResult Get() => NotFound(new { Error = "not found" });

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = GetSampleItems().FirstOrDefault(i => i.Id == id);
            return new JsonResult(item, DefaultJsonSettings);
        }

        [HttpGet("getlatest")]
        public IActionResult GetLatest([FromQuery] int? take = null)
        {
            if (take > MaxNumberOfItems) take = MaxNumberOfItems;

            var items = GetSampleItems().OrderByDescending(i => i.CreatedDate).Take(take.GetValueOrDefault(DefaultNumberOfItems));
            return new JsonResult(items, DefaultJsonSettings);
        }

        [HttpGet("getmostviewed")]
        public IActionResult GetMostViewed([FromQuery] int? take = null)
        {
            if (take > MaxNumberOfItems) take = MaxNumberOfItems;

            var items = GetSampleItems().OrderByDescending(i => i.ViewCount).Take(take.GetValueOrDefault(DefaultNumberOfItems));
            return new JsonResult(items, DefaultJsonSettings);
        }

        [HttpGet("getrandom")]
        public IActionResult GetRandom([FromQuery] int? take = null)
        {
            if (take > MaxNumberOfItems) take = MaxNumberOfItems;

            var items = GetSampleItems().OrderBy(i => Guid.NewGuid()).Take(take.GetValueOrDefault(DefaultNumberOfItems));
            return new JsonResult(items, DefaultJsonSettings);
        }

        private static IEnumerable<ItemViewModel> GetSampleItems(int num = 999)
        {
            var date = new DateTime(2015, 12, 31).AddDays(-num);
            for (var id = 1; id <= num; id++) yield return new ItemViewModel
            {
                Id = id,
                Title = $"Item {id} Title",
                Description = $"This is a sample description for item {id}: Lorem ipsum dolor sit amet.",
                CreatedDate = date.AddDays(id),
                LastModifiedDate = date.AddDays(id),
                ViewCount = num - id
            };
        }
    }
}