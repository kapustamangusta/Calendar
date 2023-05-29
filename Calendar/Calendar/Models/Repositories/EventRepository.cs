using Calendar.Models.Interfaces;
using Npgsql;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Data;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using Microsoft.Extensions.Logging;

namespace Calendar.Models.Repositories
{
    public class EventRepository : IRepEvent
    {
        private readonly AppDBContent appDBContent;
        public EventRepository(AppDBContent appDBContent)
        {
            this.appDBContent = appDBContent;

        }

        private List<Event> GetEvent(string query)
        {
            List<Event> events = new List<Event>();
            using (var command = appDBContent.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = query;
                command.CommandType = CommandType.Text;

                appDBContent.Database.OpenConnection();

                using (var result = command.ExecuteReader())
                {

                    while (result.Read())
                    {
                        Event e = new Event();
                        e.ID = result.GetInt32("event_id");
                        e.Title = result.GetString("event_title");
                        e.Description = result.GetString("event_desc");
                        e.From = result.GetString("event_from");
                        e.To = result.GetString("event_to");
                        e.Day = result.GetInt32("event_day");
                        e.Categor.Name = result.GetString("category_name");
                        e.Categor.Color = result.GetString("category_color");
                        events.Add(e);
                    }
                    appDBContent.Database.CloseConnection();
                    return events;
                }
            }
        }
        public List<Event> EventsByMonthAndYear(int month, int year)
        {
            string sql = $"select * FROM get_event_by_month_year({month}, {year})";
            return GetEvent(sql);

        }

        public List<Event> EventsByDayMonthYear(int day,int month, int year) {
            string sql = $"select * FROM get_event_by_day_month_year({day}, {month}, {year})";
            return GetEvent(sql);
        }

        public void AddEvent(Event e)
        {
           string sql = $"CALL add_event('{e.Title}'::text, '{e.Description}'::text, '{e.From}'::text, '{e.To}'::text, {e.Day}, {e.Month}, {e.Year}, '{e.Categor.Name}'::text)";
            using (var command = appDBContent.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = sql;
                command.CommandType = CommandType.Text;

                appDBContent.Database.OpenConnection();

                command.ExecuteNonQuery();
                appDBContent.Database.CloseConnection();
            }
        }

        public List<Event> GetEventById(int id)
        {
            string sql = $"select * FROM get_event_by_id({id})";
            return GetEvent(sql);
        }

        public void UpdateEvent(Event e)
        {
            string sql = $"CALL update_event( {e.ID}, '{e.Description}'::text, '{e.From}'::text, '{e.To}'::text, '{e.Categor.Name}'::text)";
            using (var command = appDBContent.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = sql;
                command.CommandType = CommandType.Text;

                appDBContent.Database.OpenConnection();

                command.ExecuteNonQuery();
                appDBContent.Database.CloseConnection();
            }
        }

        public void DeleteEvent(int id)
        {
            string sql = $"CALL delete_event({id})";
            using (var command = appDBContent.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = sql;
                command.CommandType = CommandType.Text;

                appDBContent.Database.OpenConnection();

                command.ExecuteNonQuery();
                appDBContent.Database.CloseConnection();
            }
        }
    }
}
