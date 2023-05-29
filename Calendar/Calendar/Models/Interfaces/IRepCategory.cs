namespace Calendar.Models.Interfaces
{
    public interface IRepCategory
    {
        string GetCategoryColorByName(string name);
        public List<Category> AllCategories();
    }
}
