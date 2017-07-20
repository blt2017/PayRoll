using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Compliance.App_Start;
using System.Data;
using System.Web.Routing;
using System.Text.RegularExpressions;

namespace Compliance.App_Start
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class session : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //exception for invoice pdf from url change
            if (HttpContext.Current.Request.Path == "/Orders/Generate_Invoice") return;
            //Restrict direct url enter
            if (filterContext.HttpContext.Request.UrlReferrer == null || filterContext.HttpContext.Request.Url.Host != filterContext.HttpContext.Request.UrlReferrer.Host)
            {
                filterContext.Result = new RedirectToRouteResult(new
                                          RouteValueDictionary(new { controller = "Login", action = "login", ERR = "RestrictedAccess" }));
            }
            //Check session
            HttpContext ctx = HttpContext.Current;
            //if (HttpContext.Current.Session["User_Id"] == null)
            //{
            //    filterContext.Result = new RedirectResult("~/Login/login");
            //    return;
            //}

            //bind menu
            //string Role_ID = HttpContext.Current.Session["User_Type"].ToString();
            //DataSet ds = objLog.Get_UserPermission(Role_ID);
            //DataTable main_dt = ds.Tables[1];
            //DataTable sub_dt = ds.Tables[2];
            //DataTable dt_main = new DataTable();
            //DataTable dt_sub = new DataTable();
            //if (main_dt.Rows.Count > 0)
            //{
            //    var main_dt_var = from myRow in main_dt.AsEnumerable()
            //                      where myRow.Field<int>("MainCheck") != 0
            //                      select myRow;
            //    var sub_dt_var = from myRow in sub_dt.AsEnumerable()
            //                     where myRow.Field<int>("SubCheck") != 0
            //                     select myRow;
            //    if (main_dt_var.Any())
            //    {
            //        dt_main = main_dt_var.CopyToDataTable();
            //    }
            //    if (sub_dt_var.Any())
            //        dt_sub = sub_dt_var.CopyToDataTable();
            //    List<User_Privilage> MainPage_List = new List<User_Privilage>();
            //    List<User_Privilage> SubPage_List = new List<User_Privilage>();
            //    if (dt_main.Rows.Count > 0)
            //    {
            //        foreach (DataRow row in dt_main.Rows)
            //        {
            //            MainPage_List.Add(Fill_Main_Menu(row));
            //        }
            //    }
            //    if (dt_sub.Rows.Count > 0)
            //    {
            //        foreach (DataRow row in dt_sub.Rows)
            //        {
            //            SubPage_List.Add(Fill_Sub_Menu(row));
            //        }
            //    }

            //    HttpContext.Current.Session["main_menu"] = MainPage_List;
            //    HttpContext.Current.Session["sub_menu"] = SubPage_List;
            //}

            ////List new messages
            //string User_ID = HttpContext.Current.Session["User_Id"].ToString();
            //DataSet ds2 = objMaster.list_email(null, null, null, null, null,"1", User_ID);
            //DataTable dt_notification = ds2.Tables[0];
            //List<inbox> mail_List = new List<inbox>();
            //if (dt_notification.Rows.Count > 0)
            //{
            //    foreach (DataRow row in dt_notification.Rows)
            //    {
            //        mail_List.Add(Fill_Mail(row));
            //    }
            //}
            //HttpContext.Current.Session["unread_mail"] = mail_List;




            base.OnActionExecuting(filterContext);
        }

        //private static User_Privilage Fill_Main_Menu(DataRow row)
        //{
        //    User_Privilage ObjCond = new User_Privilage();
        //    ObjCond.MainPage_ID = row["MainPageID"].ToString();
        //    ObjCond.MainPageName = row["MainPageName"].ToString();
        //    ObjCond.MainMenuAction = row["Menu_Action"].ToString();
        //    ObjCond.MainIcon = row["icon"].ToString();
        //    return ObjCond;
        //}

        //private static User_Privilage Fill_Sub_Menu(DataRow row)
        //{
        //    User_Privilage ObjCond = new User_Privilage();
        //    ObjCond.MainPage_ID = row["MainPageID"].ToString();
        //    ObjCond.SubPageName = row["SubPageName"].ToString();
        //    ObjCond.SubMenuAction = row["SubMenu_Action"].ToString();
        //    ObjCond.SubIcon = row["icon"].ToString();
        //    return ObjCond;
        //}
        //private static inbox Fill_Mail(DataRow row)
        //{
        //    inbox ObjCond = new inbox();
        //    ObjCond.Sender_Name = row["Sender_Name"].ToString();
        //    ObjCond.Mail_ID = row["Id"].ToString();
        //    //ObjCond.Body = row["Body"].ToString();
        //    ObjCond.Body2 = new HtmlString(Regex.Replace(row["Body"].ToString(), @"(<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->)",""));
        //    ObjCond.subjects = row["subjects"].ToString();
        //    ObjCond.Send_On = Convert.ToDateTime(row["Send_On"]).ToString("dd MMM, yy");
        //    ObjCond.type = row["type"].ToString();
        //    return ObjCond;
        //}
    }
}