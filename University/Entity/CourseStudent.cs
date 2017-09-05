using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace University.Entity
{
    public class CourseStudent
    {
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
    }
}
