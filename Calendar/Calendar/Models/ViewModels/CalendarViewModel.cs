namespace Calendar.Models.ViewModels
{
    public class CalendarViewModel
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public List<Event> Events { get; set; }
        public CalendarViewModel() { Events = new List<Event>(); }
        public CalendarViewModel(int month, int year)
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
