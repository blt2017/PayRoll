using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PayRoll.Models
{
    public class CommonModel
    {

    }

    public class listViewModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string Search { get; set; }
        public string sort { get; set; }
        public int RowCnt { get; set; }
        public int Start_Num { get; set; }
        public int End_Num { get; set; }
        public int TotCnt { get; set; }
        public double LastPage { get; set; }
    }

    public class branch
    {
        public string id { get; set; }
        public string Branch_Code { get; set; }
        public string Branch_Name { get; set; }
        public string Status { get; set; }
    }
	public class employee
	{
		public string id { get; set; }
		public string Employee_Code { get; set; }
		public string First_Name { get; set; }
		public string Last_Name { get; set; }
		public string Designation { get; set; }
		public string Status { get; set; }
	}
	public class designation
    {
        public string id { get; set; }
        public string Designation { get; set; }
        public string Status { get; set; }
    }

    public class salaryHead
    {
        public string id { get; set; }
        public string SalaryHead { get; set; }
        public string Status { get; set; }
    }

    public class salaryDeduction
    {
        public string id { get; set; }
        public string DeductionType { get; set; }
        public string Status { get; set; }
    }

}