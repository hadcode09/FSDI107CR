using Microsoft.EntityFrameworkCore;

namespace NewTaskManager.Models
{
    public class DataContext : DbContext
    {
        /*Evertime youchange something on the models, run these:
        
        dotnet ef migration add <name>
        
        dotnet ef database update*/

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        //which of my models should become tables in the DB
        public DbSet<Task> Tasks {get; set;}
    }
}