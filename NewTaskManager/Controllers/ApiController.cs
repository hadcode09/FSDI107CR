using Microsoft.AspNetCore.Mvc;
using NewTaskManager.Models;

using System.Linq;
using System.Collections.Generic;

namespace NewTaskManager.Controllers
{
    public class ApiController : Controller
    {
        private DataContext dbContext;
        
        public ApiController(DataContext db)
        {
            //I'm the constructor
            dbContext = db;
        }

        [HttpGet]
        public IActionResult Test()
        {
            
            string name="MA";
            return Json(name);
        }

        [HttpGet]
        public IActionResult GetTask()
        {
            // read the database
            var tasks = dbContext.Tasks.ToList();
            return Json(tasks);
        }

        [HttpPost]
        public IActionResult PostTask([FromBody] Task theTask)
        {
            //send theTask to database
            dbContext.Tasks.Add(theTask);
        
            dbContext.SaveChanges();

            // assign an id
            theTask.Id = 1;

            // return the object
            return Json(theTask);
        }
    }
}