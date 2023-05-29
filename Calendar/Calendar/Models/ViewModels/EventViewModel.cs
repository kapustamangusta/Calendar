namespace Calendar.Models.ViewModels
{
    public class EventViewModel
    {
      
        public int Month { get; set; }
        public int Year { get; set; }
        public List<Event> Events { get; set; }
        public EventViewModel() { Events = new List<Event>(); }
        public EventViewModel( int month, int year)
        {
            Events = new List<Event>();
            Month = month;
            Year = year;
        }

        public void AddEvent(Event eve)
        {
            Events.Add(eve);
        }
    }
}

