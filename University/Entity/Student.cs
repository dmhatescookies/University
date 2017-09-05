using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace University.Entity
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth  { get; set; }

        public Group Group { get; set; } 
        public IEnumerable<CourseStudent> Courses { get; set; }
    }
}
