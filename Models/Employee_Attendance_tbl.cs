//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PayRoll.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Employee_Attendance_tbl
    {
        public int id { get; set; }
        public Nullable<int> Employee { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public Nullable<decimal> Total_WorkingDays { get; set; }
        public Nullable<decimal> Present_Days { get; set; }
        public Nullable<decimal> No_ofLeaves { get; set; }
        public Nullable<int> User_Id { get; set; }
        public Nullable<int> Create_by { get; set; }
        public Nullable<System.DateTime> Create_Date { get; set; }
        public Nullable<int> Update_by { get; set; }
        public Nullable<System.DateTime> Update_Date { get; set; }
        public Nullable<int> Salary_Status { get; set; }
    
        public virtual Employee_tbl Employee_tbl { get; set; }
    }
}
