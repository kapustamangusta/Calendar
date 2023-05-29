using Calendar.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Calendar
{
    public class AppDBContent : DbContext
    {
       
        public AppDBContent(DbContextOptions<AppDBContent> options) : base(options) { }

       
    }
}
