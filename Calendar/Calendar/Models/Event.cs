using System.ComponentModel.DataAnnotations.Schema;

namespace Calendar.Models
{
    public class Event
    {
        [Column("event_id")]
        public int ID { get; set; }

        [Column("event_title")]
        public string Title { get; set; }

        [Column("event_desc")]
        public string Description { get; set; }

        [Column("event_from")]
        public string From { get; set; }

        [Column("event_to")]
        public string To { get; set; }

        [Column("category_name")]
        public Category Categor { get; set; }

        [Column("event_day")]
        public int Day { get; set; }

        public int Month { get; set; }
        public int Year { get; set; }

        public Event() { Categor = new Category(); }
        public Event(Event newEvent)
        {
            Categor = new Category();
            this.ID = newEvent.ID;
            this.Title = newEvent.Title;
            this.Description = newEvent.Description;
            this.From = newEvent.From;
            this.To = newEvent.To;
            this.Categor.Name = newEvent.Categor.Name;
            this.Categor.Color = newEvent.Categor.Color;
            this.Day = newEvent.Day;
            this.Month= newEvent.Month;
            this.Year = newEvent.Year;
        }
        public virtual Category Category { get; set; }
    }
}
