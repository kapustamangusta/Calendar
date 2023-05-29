using System.ComponentModel.DataAnnotations.Schema;

namespace Calendar.Models
{
    public class Category
    {
        [Column("category_id")]
        public int Id { get; set; }
        
        [Column("category_name")]
        public string Name { get; set; }

        [Column("category_color")]
        public string Color { get; set; }

        public virtual List<Event> Events { get; set; }
    }
}
