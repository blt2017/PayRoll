using PayRoll.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Globalization;
using System.Data.Entity;

namespace PayRoll.Controllers
{
	public class MasterController : Controller
	{
		public string err = "";
		//public static List<Branch_tbl> branch;
		//public static List<Designation_tbl> designation;

		#region BRANCH

		public ActionResult Index()
		{
			return View("Branch");
		}

		public JsonResult getBranch(int PageIndex, int PageSize, string Search, string Sort)
		{
			using (PayRoll_Entities dataContext = new PayRoll_Entities())
			{
				ArrayList paramList = new ArrayList();
				var branchList = dataContext.Branch_tbl.Select(c => new
				{
					c.id,
					c.Branch_Name,
					c.Branch_Code,
					c.Create_by,
					c.Create_Date,
					Status = c.Status == 1 ? "Active" : "In Active",
				}).ToList();

				//Sort
				if (Sort == "codeAsc")
					branchList = branchList.OrderBy(x => x.Branch_Code).ToList();
				if (Sort == "codeDesc")
					branchList = branchList.OrderByDescending(x => x.Branch_Code).ToList();
				if (Sort == "nameAsc")
					branchList = branchList.OrderBy(x => x.Branch_Name).ToList();
				if (Sort == "nameDesc")
					branchList = branchList.OrderByDescending(x => x.Branch_Name).ToList();
				if (Sort == "")
					branchList = branchList.OrderByDescending(x => x.Create_Date).ToList();

				int RowCount = dataContext.Branch_tbl.Count();
				int tottCount = dataContext.Branch_tbl.Count();

				//Search
				if (!String.IsNullOrEmpty(Search))
				{
					branchList = branchList
						.Where(s => s.Branch_Name.ToLower().Contains(Search.ToLower()) || s.Branch_Code.ToLower().Contains(Search.ToLower()))
						.Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
				}
				else
				{
					branchList = branchList.Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
				}

				int startnum = (PageIndex - 1) * PageSize + 1;
				int endnum = PageIndex * PageSize;
				RowCount = String.IsNullOrEmpty(Search) ? RowCount : branchList.Count();
				double lastpage = Math.Ceiling(Convert.ToDouble(RowCount) / Convert.ToDouble(PageSize));
				paramList.Add(branchList);
				listViewModel list_count = new listViewModel { RowCnt = RowCount, Start_Num = startnum, End_Num = endnum, TotCnt = tottCount, LastPage = lastpage };
				paramList.Add(list_count);
				return Json(paramList, JsonRequestBehavior.AllowGet);
			}
		}

		[HttpPost]
		public string AddUpdateBranch(Branch_tbl branch)
		{
			if (branch != null)
			{
				if (branch.id == 0)
				{
					using (PayRoll_Entities dataContext = new PayRoll_Entities())
					{
						branch.Create_by = 1;
						branch.Create_Date = DateTime.Now;
						dataContext.Branch_tbl.Add(branch);
						try
						{
							dataContext.SaveChanges();
							err = "Branch Added Successfully";
						}
						catch (Exception ex)
						{
							HandleException(ex);
						}
					}
				}
				else
				{
					using (PayRoll_Entities dataContext = new PayRoll_Entities())
					{
						int no = Convert.ToInt32(branch.id);
						var branchList = dataContext.Branch_tbl.Where(x => x.id == no).FirstOrDefault();
						branchList.Branch_Code = branch.Branch_Code;
						branchList.Branch_Name = branch.Branch_Name;
						branchList.Status = branch.Status;
						branchList.Update_by = 1;
						branchList.Update_Date = DateTime.Now;
						try
						{
							dataContext.SaveChanges();
							return "Branch Updated Successfully";
						}
						catch (Exception ex)
						{
							HandleException(ex);
						}
					}
				}
			}
			else
			{
				err = "Invalid Item";
			}
			return err;
		}

		public JsonResult getBranchById(string ID)
		{
			using (PayRoll_Entities dataContext = new PayRoll_Entities())
			{
				int no = Convert.ToInt32(ID);
				var branchList = dataContext.Employee_tbl
					.Where(p => p.id == no)
					.Select(p => new Employee_tbl()
					{
						id = p.id,
						First_Name = p.First_Name,
						Last_Name = p.Last_Name,
						Status = p.Status,
						Present_Address1 = p.Present_Address1,
						DOB = p.DOB,
						DOJ = p.DOJ
					}).ToList();
				return Json(branchList, JsonRequestBehavior.AllowGet);
			}
		}

		#endregion

		#region Employees

		public ActionResult Employees_List()
		{
			return View();
		}

		public JsonResult getEmployees(int PageIndex, int PageSize, string Search, string Sort)
		{
			using (PayRoll_Entities dataContext = new PayRoll_Entities())
			{
				ArrayList paramList = new ArrayList();
				var employeesList = dataContext.Employee_tbl.Select(c => new
				{
					c.id,
					c.Employee_Code,
					c.First_Name,
					c.Last_Name,
					Name = c.First_Name + " " + c.Last_Name,
					c.Designation,
					c.Mobile,
					Status = c.Status == 1 ? "Active" : "In Active",
				}).ToList();

				//Sort
				if (Sort == "codeAsc")
					employeesList = employeesList.OrderBy(x => x.Employee_Code).ToList();
				if (Sort == "codeDesc")
					employeesList = employeesList.OrderByDescending(x => x.Employee_Code).ToList();
				if (Sort == "nameAsc")
					employeesList = employeesList.OrderBy(x => x.First_Name).ToList();
				if (Sort == "nameDesc")
					employeesList = employeesList.OrderByDescending(x => x.First_Name).ToList();
				if (Sort == "")
					employeesList = employeesList.OrderByDescending(x => x.Employee_Code).ToList();

				int RowCount = dataContext.Employee_tbl.Count();
				int tottCount = dataContext.Employee_tbl.Count();

				//Search
				if (!String.IsNullOrEmpty(Search))
				{
					employeesList = employeesList
						.Where(s => s.First_Name.ToLower().Contains(Search.ToLower()) || s.Employee_Code.ToLower().Contains(Search.ToLower()))
						.Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
				}
				else
				{
					employeesList = employeesList.Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
				}

				int startnum = (PageIndex - 1) * PageSize + 1;
				int endnum = PageIndex * PageSize;
				RowCount = String.IsNullOrEmpty(Search) ? RowCount : employeesList.Count();
				double lastpage = Math.Ceiling(Convert.ToDouble(RowCount) / Convert.ToDouble(PageSize));
				paramList.Add(employeesList);
				listViewModel list_count = new listViewModel { RowCnt = RowCount, Start_Num = startnum, End_Num = endnum, TotCnt = tottCount, LastPage = lastpage };
				paramList.Add(list_count);
				return Json(paramList, JsonRequestBehavior.AllowGet);
			}
		}

		[HttpGet]
		public ActionResult Employees_Action(int id)
		{
			return View();
		}
		[HttpPost]
		public JsonResult getEmployeeById(Employee_tbl emp)
		{
			using (PayRoll_Entities dataContext = new PayRoll_Entities())
			{
				int no = emp.id;
				var employee = (from e in dataContext.Employee_tbl
								where e.id == no
								select new
								{
									e.id,
									Branch=e.Branch.ToString(),
									e.First_Name,
									e.Last_Name,
									DOB=e.DOB.ToString(),
									DOJ=e.DOJ.ToString(),
									Designation=e.Designation.ToString(),
									e.Employee_Code,
									Gender=e.Gender.ToString(),
									e.ProfileImage,
									e.Email,
									e.Mobile,
									e.Permanent_Address1,
									e.Present_Address1,
									e.Permanent_Address2,
									e.Present_Address2,
									e.Permanent_City,
									e.Present_City,
									e.Permanent_State,
									e.Present_State,
									e.Present_Pincode,
									e.Permanent_Pincode,
									e.Account_No,
									e.Bank_Name,
									e.IFSC_Code,
									e.Branch_Name,
									e.User_Id,
									Status= e.Status.ToString(),
								}).ToList();
				return Json(employee, JsonRequestBehavior.AllowGet);
			}
		}

		[HttpGet]
		public JsonResult getdropdowns()
		{
			ArrayList emp_drps = new ArrayList();
			emp_drps.Add(drp_desi());
			emp_drps.Add(drp_branch());

			return Json(emp_drps, JsonRequestBehavior.AllowGet);
		}

		public List<SelectListItem> drp_desi()
		{
			using (PayRoll_Entities dataContext = new PayRoll_Entities())
			{
				var content = dataContext.Designation_tbl.Select(d => new { desination = d.Designation, id = d.id }).OrderBy(d => d.desination);

			var x = content.ToList().Select(c => new SelectListItem
			{
				Text = c.desination.ToString(),
				Value = c.id.ToString(),
			}).ToList();
				return x;
			}
		}

		public List<SelectListItem> drp_branch()
		{
			using (PayRoll_Entities dataContext = new PayRoll_Entities())
			{
				var content = dataContext.Branch_tbl.Select(d => new { name = d.Branch_Name, id = d.id }).OrderBy(d => d.id);

				var x = content.ToList().Select(c => new SelectListItem
				{
					Text = c.name.ToString(),
					Value = c.id.ToString(),
				}).ToList();
				return x;
			}
		}


		[HttpPost]
		public string AddUpdateEmployee(Employee_tbl employee, HttpPostedFileBase file)
		{
			if (employee != null)
			{
				if (employee.id == 0)
				{
					using (PayRoll_Entities dataContext = new PayRoll_Entities())
					{
						var allowedExtensions = new[] {
							".Jpg", ".png", ".jpg", "jpeg"
						};
						//tbl.Id = fc["Id"].ToString();
						//tbl.Image_url = file.ToString(); //getting complete url  
						//tbl.Name = fc["Name"].ToString();
						//var fileName = Path.GetFileName(file.FileName); //getting only file name(ex-ganesh.jpg)  
						//var ext = Path.GetExtension(file.FileName); //getting the extension(ex-.jpg)  
						//if (allowedExtensions.Contains(ext)) //check what type of extension  
						//{
						//	string name = Path.GetFileNameWithoutExtension(fileName); //getting file name without extension  
						//	string myfile = name + "_" + tbl.Id + ext; //appending the name with id  
						//											   // store the file inside ~/project folder(Img)  
						//	var path = Path.Combine(Server.MapPath("~/Img"), myfile);
						//	tbl.Image_url = path;
						//	obj.tbl_details.Add(tbl);
						//	obj.SaveChanges();
						//	file.SaveAs(path);
						//}
						employee.Create_by = 1;
						employee.Create_Date = DateTime.Now;
						dataContext.Employee_tbl.Add(employee);
						try
						{
							dataContext.SaveChanges();
							err = "employee Added Successfully";
						}
						catch (Exception ex)
						{
							HandleException(ex);
						}
					}
				}
				else
				{
					using (PayRoll_Entities dataContext = new PayRoll_Entities())
					{
						int no = Convert.ToInt32(employee.id);
						var empList = dataContext.Employee_tbl.Where(x => x.id == no).FirstOrDefault();
						empList.Employee_Code = employee.Employee_Code;
						empList.First_Name = employee.First_Name;
						empList.Last_Name = employee.Last_Name;
						empList.Gender = employee.Gender;
						empList.DOB = employee.DOB;
						empList.DOJ = employee.DOJ;
						empList.Email = employee.Email;
						empList.Mobile = employee.Mobile;
						empList.Designation = employee.Designation;
						empList.Branch = employee.Branch;
						empList.Present_Address1 = employee.Present_Address1;
						empList.Present_Address2 = employee.Present_Address2;
						empList.Present_City = employee.Present_City;
						empList.Present_State = employee.Present_State;
						empList.Present_Pincode = employee.Present_Pincode;
						empList.Permanent_Address1 = employee.Permanent_Address1;
						empList.Permanent_Address2 = employee.Permanent_Address2;
						empList.Permanent_City = employee.Permanent_City;
						empList.Permanent_State = employee.Permanent_State;
						empList.Permanent_Pincode = employee.Permanent_Pincode;
						empList.Bank_Name = employee.Bank_Name;
						empList.Account_No = employee.Account_No;
						empList.IFSC_Code = employee.IFSC_Code;
						empList.Branch_Name = employee.Branch_Name;
						empList.Status = employee.Status;
						empList.User_Id = employee.User_Id;
						empList.Update_by = 1;
						empList.Update_Date = DateTime.Now;
						empList.ProfileImage = employee.ProfileImage;
						try
						{
							dataContext.SaveChanges();
							return "Employee Updated Successfully";
						}
						catch (Exception ex)
						{
							HandleException(ex);
						}
					}
				}
			}
			else
			{
				err = "Invalid Item";
			}
			return err;
		}
		#endregion

		#region DESIGNATION

		public ActionResult Designation()
        {
            return View();
        }

        public JsonResult getDesignation(int PageIndex, int PageSize, string Search, string Sort)
        {
            using (PayRoll_Entities dataContext = new PayRoll_Entities())
            {
                ArrayList paramList = new ArrayList();
                var designList = dataContext.Designation_tbl.Select(c => new
                {
                    c.id,
                    c.Designation,
                    c.Create_by,
                    c.Create_Date,
                    Status = c.Status == 1 ? "Active" : "In Active",
                }).ToList();

                //Sort
                if (Sort == "designationAsc")
                    designList = designList.OrderBy(x => x.Designation).ToList();
                if (Sort == "designationDesc")
                    designList = designList.OrderByDescending(x => x.Designation).ToList();
                if (Sort == "")
                    designList = designList.OrderByDescending(x => x.Create_Date).ToList();

                int RowCount = dataContext.Designation_tbl.Count();
                int tottCount = dataContext.Designation_tbl.Count();

                //Search
                if (!String.IsNullOrEmpty(Search))
                {
                    designList = designList
                        .Where(s => s.Designation.ToLower().Contains(Search.ToLower()))
                        .Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
                }
                else
                {
                    designList = designList.Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
                }

                int startnum = (PageIndex - 1) * PageSize + 1;
                int endnum = PageIndex * PageSize;
                RowCount = String.IsNullOrEmpty(Search) ? RowCount : designList.Count();
                double lastpage = Math.Ceiling(Convert.ToDouble(RowCount) / Convert.ToDouble(PageSize));
                paramList.Add(designList);
                listViewModel list_count = new listViewModel { RowCnt = RowCount, Start_Num = startnum, End_Num = endnum, TotCnt = tottCount, LastPage = lastpage };
                paramList.Add(list_count);
                return Json(paramList, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public string AddUpdateDesignation(Designation_tbl design)
        {
            if (design != null)
            {
                if (design.id == 0)
                {
                    using (PayRoll_Entities dataContext = new PayRoll_Entities())
                    {
                        design.Create_by = 1;
                        design.Create_Date = DateTime.Now;
                        dataContext.Designation_tbl.Add(design);
                        try
                        {
                            dataContext.SaveChanges();
                            err = "Designation Added Successfully";
                        }
                        catch (Exception ex)
                        {
                            HandleException(ex);
                        }
                    }
                }
                else
                {
                    using (PayRoll_Entities dataContext = new PayRoll_Entities())
                    {
                        int no = Convert.ToInt32(design.id);
                        var designationList = dataContext.Designation_tbl.Where(x => x.id == no).FirstOrDefault();
                        designationList.Designation = design.Designation;
                        designationList.Status = design.Status;
                        designationList.Update_by = 1;
                        designationList.Update_Date = DateTime.Now;
                        try
                        {
                            dataContext.SaveChanges();
                            return "Designation Updated Successfully";
                        }
                        catch (Exception ex)
                        {
                            HandleException(ex);
                        }
                    }
                }
            }
            else
            {
                err = "Invalid Item";
            }
            return err;
        }

        public JsonResult getDesignationById(string ID)
        {
            using (PayRoll_Entities dataContext = new PayRoll_Entities())
            {
                int no = Convert.ToInt32(ID);
                var designationList = dataContext.Designation_tbl
                    .Where(p => p.id == no)
                    .Select(p => new designation()
                    {
                        id = p.id.ToString(),
                        Designation = p.Designation,
                        Status = p.Status.ToString()
                    }).ToList();
                return Json(designationList, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region SALARY HEAD

        public ActionResult SalaryHead()
        {
            return View();
        }

        public JsonResult getSalaryHead(int PageIndex, int PageSize, string Search, string Sort)
        {
            using (PayRoll_Entities dataContext = new PayRoll_Entities())
            {
                ArrayList paramList = new ArrayList();
                var salaryHeadList = dataContext.SalaryHead_tbl.Select(c => new
                {
                    c.id,
                    c.SalaryHead,
                    c.Create_by,
                    c.Create_Date,
                    Status = c.Status == 1 ? "Active" : "In Active",
                }).ToList();

                //Sort
                if (Sort == "salaryHeadAsc")
                    salaryHeadList = salaryHeadList.OrderBy(x => x.SalaryHead).ToList();
                if (Sort == "salaryHeadDesc")
                    salaryHeadList = salaryHeadList.OrderByDescending(x => x.SalaryHead).ToList();
                if (Sort == "")
                    salaryHeadList = salaryHeadList.OrderByDescending(x => x.Create_Date).ToList();

                int RowCount = dataContext.SalaryHead_tbl.Count();
                int tottCount = dataContext.SalaryHead_tbl.Count();

                //Search
                if (!String.IsNullOrEmpty(Search))
                {
                    salaryHeadList = salaryHeadList
                        .Where(s => s.SalaryHead.ToLower().Contains(Search.ToLower()))
                        .Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
                }
                else
                {
                    salaryHeadList = salaryHeadList.Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
                }

                int startnum = (PageIndex - 1) * PageSize + 1;
                int endnum = PageIndex * PageSize;
                RowCount = String.IsNullOrEmpty(Search) ? RowCount : salaryHeadList.Count();
                double lastpage = Math.Ceiling(Convert.ToDouble(RowCount) / Convert.ToDouble(PageSize));
                paramList.Add(salaryHeadList);
                listViewModel list_count = new listViewModel { RowCnt = RowCount, Start_Num = startnum, End_Num = endnum, TotCnt = tottCount, LastPage = lastpage };
                paramList.Add(list_count);
                return Json(paramList, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public string AddUpdateSalaryHead(SalaryHead_tbl sHead)
        {
            if (sHead != null)
            {
                if (sHead.id == 0)
                {
                    using (PayRoll_Entities dataContext = new PayRoll_Entities())
                    {
                        sHead.Create_by = 1;
                        sHead.Create_Date = DateTime.Now;
                        dataContext.SalaryHead_tbl.Add(sHead);
                        try
                        {
                            dataContext.SaveChanges();
                            err = "Salary Head Added Successfully";
                        }
                        catch (Exception ex)
                        {
                            HandleException(ex);
                        }
                    }
                }
                else
                {
                    using (PayRoll_Entities dataContext = new PayRoll_Entities())
                    {
                        int no = Convert.ToInt32(sHead.id);
                        var salaryHeadList = dataContext.SalaryHead_tbl.Where(x => x.id == no).FirstOrDefault();
                        salaryHeadList.SalaryHead = sHead.SalaryHead;
                        salaryHeadList.Status = sHead.Status;
                        salaryHeadList.Update_by = 1;
                        salaryHeadList.Update_Date = DateTime.Now;
                        try
                        {
                            dataContext.SaveChanges();
                            return "Salary Head Updated Successfully";
                        }
                        catch (Exception ex)
                        {
                            HandleException(ex);
                        }
                    }
                }
            }
            else
            {
                err = "Invalid Item";
            }
            return err;
        }

        public JsonResult getSalaryHeadById(string ID)
        {
            using (PayRoll_Entities dataContext = new PayRoll_Entities())
            {
                int no = Convert.ToInt32(ID);
                var salaryHeadList = dataContext.SalaryHead_tbl
                    .Where(p => p.id == no)
                    .Select(p => new salaryHead()
                    {
                        id = p.id.ToString(),
                        SalaryHead = p.SalaryHead,
                        Status = p.Status.ToString()
                    }).ToList();
                return Json(salaryHeadList, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region SALARY Detuction

        public ActionResult SalaryDeduction()
        {
            return View();
        }

        public JsonResult getSalaryDeduction(int PageIndex, int PageSize, string Search, string Sort)
        {
            using (PayRoll_Entities dataContext = new PayRoll_Entities())
            {
                ArrayList paramList = new ArrayList();
                var salaryDeductionList = dataContext.SalaryDeduction_tbl.Select(c => new
                {
                    c.id,
                    c.DeductionType,
                    c.Create_by,
                    c.Create_Date,
                    Status = c.Status == 1 ? "Active" : "In Active",
                }).ToList();

                //Sort
                if (Sort == "salaryDeductionAsc")
                    salaryDeductionList = salaryDeductionList.OrderBy(x => x.DeductionType).ToList();
                if (Sort == "salaryDeductionDesc")
                    salaryDeductionList = salaryDeductionList.OrderByDescending(x => x.DeductionType).ToList();
                if (Sort == "")
                    salaryDeductionList = salaryDeductionList.OrderByDescending(x => x.Create_Date).ToList();

                int RowCount = dataContext.SalaryDeduction_tbl.Count();
                int tottCount = dataContext.SalaryDeduction_tbl.Count();

                //Search
                if (!String.IsNullOrEmpty(Search))
                {
                    salaryDeductionList = salaryDeductionList
                        .Where(s => s.DeductionType.ToLower().Contains(Search.ToLower()))
                        .Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
                }
                else
                {
                    salaryDeductionList = salaryDeductionList.Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
                }

                int startnum = (PageIndex - 1) * PageSize + 1;
                int endnum = PageIndex * PageSize;
                RowCount = String.IsNullOrEmpty(Search) ? RowCount : salaryDeductionList.Count();
                double lastpage = Math.Ceiling(Convert.ToDouble(RowCount) / Convert.ToDouble(PageSize));
                paramList.Add(salaryDeductionList);
                listViewModel list_count = new listViewModel { RowCnt = RowCount, Start_Num = startnum, End_Num = endnum, TotCnt = tottCount, LastPage = lastpage };
                paramList.Add(list_count);
                return Json(paramList, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public string AddUpdateSalaryDeduction(SalaryDeduction_tbl sHead)
        {
            if (sHead != null)
            {
                if (sHead.id == 0)
                {
                    using (PayRoll_Entities dataContext = new PayRoll_Entities())
                    {
                        sHead.Create_by = 1;
                        sHead.Create_Date = DateTime.Now;
                        dataContext.SalaryDeduction_tbl.Add(sHead);
                        try
                        {
                            dataContext.SaveChanges();
                            err = "Salary Head Added Successfully";
                        }
                        catch (Exception ex)
                        {
                            HandleException(ex);
                        }
                    }
                }
                else
                {
                    using (PayRoll_Entities dataContext = new PayRoll_Entities())
                    {
                        int no = Convert.ToInt32(sHead.id);
                        var salaryHeadList = dataContext.SalaryDeduction_tbl.Where(x => x.id == no).FirstOrDefault();
                        salaryHeadList.DeductionType = sHead.DeductionType;
                        salaryHeadList.Status = sHead.Status;
                        salaryHeadList.Update_by = 1;
                        salaryHeadList.Update_Date = DateTime.Now;
                        try
                        {
                            dataContext.SaveChanges();
                            return "Salary Head Updated Successfully";
                        }
                        catch (Exception ex)
                        {
                            HandleException(ex);
                        }
                    }
                }
            }
            else
            {
                err = "Invalid Item";
            }
            return err;
        }

        public JsonResult getSalaryDeductionById(string ID)
        {
            using (PayRoll_Entities dataContext = new PayRoll_Entities())
            {
                int no = Convert.ToInt32(ID);
                var salaryDeductionList = dataContext.SalaryDeduction_tbl
                    .Where(p => p.id == no)
                    .Select(p => new salaryDeduction()
                    {
                        id = p.id.ToString(),
                        DeductionType = p.DeductionType,
                        Status = p.Status.ToString()
                    }).ToList();
                return Json(salaryDeductionList, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        public virtual void HandleException(Exception exception)
        {
            DbUpdateConcurrencyException concurrencyEx = exception as DbUpdateConcurrencyException;
            if (concurrencyEx != null)
            {
                // A custom exception of yours for concurrency issues
                err = "Error while Save data..";
            }

            DbUpdateException dbUpdateEx = exception as DbUpdateException;
            if (dbUpdateEx != null)
            {
                if (dbUpdateEx.InnerException != null
                        && dbUpdateEx.InnerException.InnerException != null)
                {
                    SqlException sqlException = dbUpdateEx.InnerException.InnerException as SqlException;
                    if (sqlException != null)
                    {
                        if (sqlException.Number == 2627)
                            err = "Item name should be Unique..Can't insert dublicate data..";
                        else
                            err = "Error while Save data..";
                    }
                }
            }
        }

    }
}