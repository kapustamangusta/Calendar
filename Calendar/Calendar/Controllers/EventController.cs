using Calendar.Models;
using Calendar.Models.Interfaces;
using Calendar.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;


namespace Calendar.Controllers
{
    public class EventController : Controller
    {
        private readonly IRepEvent _events;
        private readonly IRepCategory _category;

        public EventController(IRepEvent events, IRepCategory cat)
        {
            _events = events;
            _category = cat;
        }

        public IActionResult Index()
        {

            return View();
        }

        [HttpPost]
        [Route("/Event/Calendar/{txt}")]
        public JsonResult Calendar(string txt)
        {
            HelpTime ht = new HelpTime();
            ht = JsonConvert.DeserializeObject<HelpTime>(txt);
            int month = Convert.ToInt32(ht.month);
            int year = Convert.ToInt32(ht.year);

            List<Event> res = _events.EventsByMonthAndYear(month, year);
           
            CalendarViewModel eventViewModel = new CalendarViewModel();
            foreach (var el in res)
            {

                eventViewModel.Events.Add(el);

            }
            
            return Json(eventViewModel);
        }


        [HttpPost]
        [Route("/Event/UpdateEvents/{txt}")]
        public JsonResult UpdateEvents(string txt)
        {
            HelpTime ht = new HelpTime();
            ht = JsonConvert.DeserializeObject<HelpTime>(txt);
            int day = Convert.ToInt32(ht.day);
            int month = Convert.ToInt32(ht.month);
            int year = Convert.ToInt32(ht.year);

            List<Event> res = _events.EventsByDayMonthYear(day, month, year);

            CalendarViewModel eventViewModel = new CalendarViewModel();
            foreach (var el in res)
            {

                eventViewModel.Events.Add(el);

            }

            return Json(eventViewModel);
        }

        public JsonResult AllCategories()
        {
            List<Category> res = _category.AllCategories();
            return Json(res);
        }


        [HttpPost]
        [Route("/Event/AddEvent/{txt}")]
        public JsonResult AddEvent(string txt)
        {
            Event newEvent = new Event();
            newEvent = JsonConvert.DeserializeObject<Event>(txt);
            _events.AddEvent(newEvent);
            return Json(txt);
        }


        [HttpPost]
        [Route("/Event/GetEvent/{txt}")]
        public JsonResult GetEvent(string txt)
        {
            int id = JsonConvert.DeserializeObject<int>(txt);
            List<Event> e = _events.GetEventById(id);
            return Json(e[0]);
        }

        [HttpPost]
        [Route("/Event/UpdateEvent/{txt}")]
        public JsonResult UpdateEvent(string txt)
        {
            Event updateEvent = new Event();
            updateEvent = JsonConvert.DeserializeObject<Event>(txt);
            _events.UpdateEvent(updateEvent);
            return Json(txt);
        }

        [HttpPost]
        [Route("/Event/DeleteEvent/{txt}")]
        public JsonResult DeleteEvent(string txt)
        {
            int id = JsonConvert.DeserializeObject<int>(txt);
            _events.DeleteEvent(id);
            return Json(txt);
        }
    }
}
