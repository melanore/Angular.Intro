using System;
using System.Collections.Generic;
using System.Linq;
using Angular.Intro.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Angular.Intro.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        private const int DefaultNumberOfItems = 5;
        private const int MaxNumberOfItems = 100;

        [HttpGet]
        public IActionResult Get() => 
            NotFound(new { Error = "not found" });

        [HttpGet("{id}")]
        public ItemViewModel Get(int id) =>
            SampleItemsSeq().FirstOrDefault(i => i.Id == id);

        [HttpGet("getLatest")]
        public IEnumerable<ItemViewModel> GetLatest([FromQuery] int? take = DefaultNumberOfItems) =>
            SampleItemsSeq(take.Value).OrderByDescending(i => i.CreatedDate);

        [HttpGet("getMostViewed")]
        public IEnumerable<ItemViewModel> GetMostViewed([FromQuery] int? take = DefaultNumberOfItems) =>
            SampleItemsSeq(take.Value).OrderByDescending(i => i.ViewCount);

        [HttpGet("getRandom")]
        public IEnumerable<ItemViewModel> GetRandom([FromQuery] int? take = DefaultNumberOfItems) =>
            SampleItemsSeq(take.Value).OrderBy(i => Guid.NewGuid());

        private static IEnumerable<ItemViewModel> SampleItemsSeq(int num = MaxNumberOfItems)
        {
            if (num > MaxNumberOfItems) num = MaxNumberOfItems;
            var date = DateTime.UtcNow.AddDays(-num);

            return Enumerable.Range(1, num).Select(id => new ItemViewModel
            {
                Id = id,
                Title = $"Title mock_{id}",
                Description = $"Lorem ipsum dolor sit amet {id}.",
                CreatedDate = date.AddDays(id),
                LastModifiedDate = date.AddDays(id),
                ViewCount = num - id
            });
        }
    }
}