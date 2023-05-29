using Calendar.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Xml.Linq;

namespace Calendar.Models.Repositories
{
    public class CategoryRepository : IRepCategory
    {
        private readonly AppDBContent appDBContent;
        public CategoryRepository(AppDBContent appDBContent)
        {
            this.appDBContent = appDBContent;

        }
        public string GetCategoryColorByName(string name)
        {
            string sql = $"SELECT * FROM get_category_color_by_name('{name}')";
            string color="";
            using (var command = appDBContent.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = sql;
                command.CommandType = CommandType.Text;

                appDBContent.Database.OpenConnection();

                using (var result = command.ExecuteReader())
                {

                    while (result.Read())
                    {
                        color = result.GetString("category_color");
                    }
                    appDBContent.Database.CloseConnection();
                    return color;
                }
            }
        }

        public List<Category> AllCategories()
        {
            string sql = $"SELECT * FROM get_all_categories();";
            List<Category> categories= new List<Category>();
            using (var command = appDBContent.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = sql;
                command.CommandType = CommandType.Text;

                appDBContent.Database.OpenConnection();

                using (var result = command.ExecuteReader())
                {

                    while (result.Read())
                    {
                        Category category= new Category();
                        category.Name = result.GetString("category_name");
                        categories.Add(category);
                    }
                    appDBContent.Database.CloseConnection();
                    return categories;
                }
            }
        }
    }
}
