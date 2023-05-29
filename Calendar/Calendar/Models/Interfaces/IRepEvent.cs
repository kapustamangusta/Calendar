namespace Calendar.Models.Interfaces
{
    public interface IRepEvent
    {
        public List<Event> EventsByMonthAndYear(int month, int year);
        public List<Event> EventsByDayMonthYear(int day, int month, int year);

        public void AddEvent(Event e);

        public List<Event> GetEventById(int id);
        public void UpdateEvent(Event e);

        public void DeleteEvent(int id);
    }
}
