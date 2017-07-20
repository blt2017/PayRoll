//Adminstrator partial view scripts

//1.Category
$(document).ready(function () {
    //List
    var category_url = '/Administrator/Category_Edit';
    $(".category_edit").click(function () {

        var $buttonclicked = $(this);
        var cat_id = $buttonclicked.attr('data-id');
        $.ajax({
            type: "Get",
            url: category_url,
            contentType: "application/json; charset=utf-8",
            data: { "Category_ID": cat_id },
            datatype: "json",
            success: function (data) {
                $(".modal-body").html(data);
                $("#modal_visible").click();
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });

    //Edit
    var category_add_Url = '/Administrator/Category_Action';
    $("#cat_add").click(function () {
        if ($("#txt_Category_Name").val() != "") {
                var ServiceCategory = {
                Category_ID: jQuery("#Id").val()
                , Category_Name: jQuery("#txt_Category_Name").val()
                , Category_Desc: jQuery("#txt_Category_Desc").val()
                , Category_Status: jQuery("#drp_Status").val()
            }
            $.ajax({
                type: "POST",
                url: category_add_Url,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(ServiceCategory),
                datatype: "json",
                success: function (data) {
                    window.location = "/Administrator/Category";
                    //$(".close").click();
                    //$(".modal-content").hide();
                },
                error: function (data) {
                    alert("Loading Faild.");
                }
            });
        }
        else {
            $("#Category_Name").text("Enter Category Name");
            return false;
        }
    });
    $("#btn_cat_ser_clear").click(function () {
        $("#txt_Category_Name").val("");
        $("#txt_Category_Desc").val("");
        $("#drp_Status").val(1);
    });

});

//2.Pricing tier
$(document).ready(function () {
    discount_Summary_Function();
    $('.Cdis_style').click(function () {
        var $this = $(this);
        $this.toggleClass('Cdis_style');
        if ($this.hasClass('Cdis_style')) {
            $this.text('%');
            discount_Summary_Function();
            //alert($this.text());
        } else {
            $this.text('$');
            discount_Summary_Function();
            //alert($this.text());
        }
    });
    $('.price_discount').keypress(function (eve) {
        if ((eve.which != 46 || $(this).val().indexOf('.') != -1) && (eve.which < 48 || eve.which > 57) || (eve.which == 46 && $(this).caret().start == 0)) {
            eve.preventDefault();
        }

        // this part is when left part of number is deleted and leaves a . in the leftmost position. For example, 33.25, then 33 is deleted
        $('.price_discount').keyup(function (eve) {
            if ($(this).val().indexOf('.') == 0) {
                $(this).val($(this).val().substring(1));
            }
        });
    });
    $(".price_discount").keyup(function () {
        discount_Summary_Function();
    });
    $(".price_discount").change(function () {
        $(".PTier_servicelist").each(function () {
            var value = parseFloat($(this).find('.price_discount').val());
            var temp_discount_type = $(this).find('.calcMethod').text();
        if (isNaN(value)) {
            $(this).find('.price_discount').val("0");
        }
        else if (value == "") {
            $(this).find('.price_discount').val("0");
        }
        if (temp_discount_type =="%" && value > 100) {
            $(this).find('.price_discount').val("100");
        }
        discount_Summary_Function();
        });
    });
    //edit
    var Pricing_Tier_add_Url = '/Administrator/Pricing_Action';
    $("#Pricing_Tier_add").click(function () {
        if (pricing_validation() == true) {
        var i = 0;
        var PricingTiers = [];
        $('.PTier_servicelist').each(function () {
            var productpricingid = $('#productpricingid_' + i).val();
            var productid = $('#productid_' + i).val();
            var productprice = $(this).find('.product_price').text();
            var pricingid = $('#pricingid_' + i).val();
            var discount = $('#txt_discount_' + i).val();
            var temp_discount_type = $(this).find('.calcMethod').text();
            if (temp_discount_type == "%") {
                var discount_type = "0";
            }
            else {
                var discount_type = "1";
            }
            var discount_price = $(this).find('.txt_Discount_Price').text();
            var final_price = $(this).find('.txt_Final_Price').text();
            var productpricing =
            {
                productpricingid: productpricingid,
                productid: productid,
                pricingid: pricingid,
                productprice: productprice,
                discount: discount,
                discount_type: discount_type,
                discount_price: discount_price ,
                final_price: final_price,
            };
            PricingTiers.push(productpricing);
            i++;
        });
        var PricingTiers = {
            Pricing_ID: jQuery("#Id").val()
        , Pricing_Name: jQuery("#txt_Pricing_Tier_Name").val()
        , Pricing_Status: jQuery("#drp_Status").val()
        , productpricing: PricingTiers
        };
        $.ajax({
            type: "POST",
            url: Pricing_Tier_add_Url,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(PricingTiers),
            datatype: "json",
            success: function (data) {
                window.location = "/Administrator/PricingTiers";
                //$(".close").click();
                //$(".modal-content").hide();
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    }
    });
    function pricing_validation() {
        var pricingtiervalue = $("#txt_Pricing_Tier_Name").val()

        var i = 0;
        if (pricingtiervalue == "") {
            i = 1;
            $("#pricing_error").text("Enter Pricing Tier Name");
        }
        if (i == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    $("#btn_Pricing_Tier_clear").click(function () {
        var i = 0;
        $('.price_block').each(function () {
            $('#txt_Price_Min_' + i).val("0.00");
            $('#txt_Price_Max_' + i).val("0.00");
            i++;
        });
        $("#txt_Pricing_Tier_Name").val("");
        $("#drp_Status").val(1);
    });

    //List
    $('[data-toggle="tooltip"]').tooltip();
    var pricing_edit = '/Administrator/Pricing_Edit';
    $(".pricing_edit").click(function () {

        var $buttonclicked = $(this);
        var cat_id = $buttonclicked.attr('data-id');
        $.ajax({
            type: "Get",
            url: pricing_edit,
            contentType: "application/json; charset=utf-8",
            data: { "Pricing_ID": cat_id },
            datatype: "json",
            success: function (data) {
                $(".modal-body").html(data);
                $("#modal_visible").click();
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });
});
function discount_Summary_Function() {
    $(".PTier_servicelist").each(function () {
        var temp_service_price = parseFloat($(this).find('.product_price').text());
        var temp_discount_type = $(this).find('.calcMethod').text();
        if (temp_discount_type == "%")
        {
            var temp_discount = parseFloat($(this).find('.price_discount').val());
            var temp_discount_price=(temp_service_price * temp_discount) / 100;
            var temp_final_price = temp_service_price - temp_discount_price;
            $(this).find('.txt_Discount_Price').text(temp_discount_price);
            $(this).find('.txt_Final_Price').text(temp_final_price);
        }
        else
        {
            var temp_discount = parseFloat($(this).find('.price_discount').val());
            var temp_final_price = temp_service_price - temp_discount;
            $(this).find('.txt_Discount_Price').text(temp_discount);
            $(this).find('.txt_Final_Price').text(temp_final_price);
        }
        //return false;
    });

}
//3.Service
$(document).ready(function () {
    //Edit
    function service_validation() {
        var s_name = $("#txt_Service_Name").val()
        var Category_ID = $("#drp_Category_Name").val()
        var Service_Desc = $("#txt_Service_Desc").val()
        var Service_Price = $("#txt_Service_Price").val()
        var Service_Rush_Fee = $("#txt_Service_Rush_Fee").val()
        var StartDate = $("#txt_start_date").val()
        var EndDate = $("#txt_end_date").val()
        var i = 0;
        if (s_name == "") {
            i = 1;
            $("#s_name").text("Enter Service Name");
        }
        if (Category_ID == "") {
            i = 1;
            $("#Category_ID").text("Select Category");
        }
        if (StartDate == "") {
            i = 1;
            $("#StartDate").text("Select Start Date ");
        }
        if (EndDate == "") {
            i = 1;
            $("#EndDate").text("Select End Date");
        }
        if (Service_Price == "") {
            i = 1;
            $("#Service_Price").text("Enter Price");
        }
        if (i == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    var service_add_Url = '/Administrator/Service_Action';
    $("#Service_add").click(function () {
        if (service_validation() == true) {
            var RequestForm = "";
            var fileUpload = $("#File").get(0);
            var files = fileUpload.files;
            var fileData = new FormData();
            for (var i = 0; i < files.length; i++) {
                fileData.append(files[i].name, files[i]);
            }
            fileData.append('TEXT', 'sa');
            //alert(fileData);
            $.ajax({
                url: '/Administrator/FileUpload', type: "POST", processData: false,
                contentType: false,
                processData: false,
                data: fileData,
                success: function (result) {
                    RequestForm = result == "" ? $("#filepath_hidden_temp").val() : result;
                    var ListService = {
                        Service_ID: jQuery("#Service_Id").val()
                        , Service_Name: jQuery("#txt_Service_Name").val()
                        , Category_ID: jQuery("#drp_Category_Name").val()
                        , Category_Name: jQuery("#drp_Category_Name").val()
                        , Service_Desc: jQuery("#txt_Service_Desc").val()
                        , Service_Price: jQuery("#txt_Service_Price").val()
                        , Service_Rush_Fee: jQuery("#txt_Service_Rush_Fee").val()
                        , Service_Status: jQuery("#drp_Status").val()
                        , Service_Requestform: RequestForm
                        , StartDate: jQuery("#txt_start_date").val()
                        , EndDate: jQuery("#txt_end_date").val()
                    }
                    $.ajax({
                        type: "POST",
                        url: service_add_Url,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(ListService),
                        datatype: "json",
                        success: function (data) {
                            window.location = "/Administrator/Service";
                        },
                        error: function (data) {
                            alert("Loading Faild.");
                        }
                    });
                },
                error: function (er) { }

            });
        }
    });
    $("#btn_Service_clear").click(function () {
        $("#txt_Service_Name").val("");
        $("#txt_Service_Desc").val("");
        $("#drp_Status").val(1);
        $("#drp_Category_Name").val("");
        $("#txt_Service_Rush_Fee").val("");
        $("#txt_Service_Price").val("");
        $("#filepath_hidden").val("");
        $("#txt_start_date").val("");
        $("#txt_end_date").val("");
        $("#removeFile").removeClass("fileinput input-group fileinput-exists");
        $("#removeFile").addClass("fileinput fileinput-new input-group");
        $("#selected_file_name").empty();
    });

    //List
    var Service_Edit = '/Administrator/Service_Edit';
    $(".Service_Edit").click(function () {

        var $buttonclicked = $(this);
        var cat_id = $buttonclicked.attr('data-id');
        $.ajax({
            type: "Get",
            url: Service_Edit,
            contentType: "application/json; charset=utf-8",
            data: { "Service_ID": cat_id },
            datatype: "json",
            success: function (data) {
                $(".modal-body").html(data);
                $("#modal_visible").click();
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });

});

//Maintenance

//1.Agency
$(document).ready(function () {
    //List
    var Agency_Edit = '/Maintenance/Agency_Edit';
    $(".Agency_Edit").click(function () {
        var $buttonclicked = $(this);
        var id = $buttonclicked.attr('data-id');
        $.ajax({
            type: "Get",
            url: Agency_Edit,
            contentType: "application/json; charset=utf-8",
            data: { "agency_Id": id },
            datatype: "json",
            success: function (data) {
                $(".modal-body").html(data);
                $("#modal_visible").click();
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });
    $('.agency_broker').click(function () {
        var Agn_Id = $(this).attr('data-id');
        var Agn_Name = $(this).attr('dataname');
        var Agency_Select = '/Maintenance/Agency_Select';
        $.ajax({
            type: "Get",
            url: Agency_Select,
            contentType: "application/json; charset=utf-8",
            data: { "Agn_Id": Agn_Id, "Agn_Name": Agn_Name },
            datatype: "json",
            success: function (response) {
                if (response == "1") {
                    window.location = "/Maintenance/Broker_List";
                }
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });
    //ADD
    $(document).ready(function () {
        function agency_val() {
            var ag_name = $("#txt_Agency_Name").val();
            //var ag_phone = $("#txt_Agency_Phone").val();
            var ag_add1 = $("#txt_Agency_Addr1").val();
            var ag_city = $("#txt_Agency_City").val();
            var ag_state = $("#drp_Agency_State").val();
            var ag_zip = $("#txt_Agency_Zip").val();
            var i = 0;
            if (ag_name == "") {
                i = 1;
                $("#ag_name").text("Enter Agency Name");
            }
            //if (ag_phone == "") {
            //    i = 1;
            //    $("#ag_phone").text("Enter Phone Number");
            //}
            if (ag_add1 == "") {
                i = 1;
                $("#ag_add1").text("Enter Address");
            }
            if (ag_city == "") {
                i = 1;
                $("#ag_city").text("Enter City ");
            }
            if (ag_state == "") {
                i = 1;
                $("#ag_state").text("Select State");
            }
            if (ag_zip == "") {
                i = 1;
                $("#ag_zip").text("Enter Zip Code");
            }
           
            if (i == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        var agency_add_Url = '/Master/Agency_Action';
        $("#Agency_add").click(function () {
            if (agency_val() == true) {
                var agency = {
                    Agency_ID: jQuery("#Agency_Id").val()
                    , Agency_Name: jQuery("#txt_Agency_Name").val()
                    , Agency_Phone: jQuery("#txt_Agency_Phone").val()
                    , Agency_Addr1: jQuery("#txt_Agency_Addr1").val()
                    , Agency_Addr2: jQuery("#txt_Agency_Addr2").val()
                    , Agency_City: jQuery("#txt_Agency_City").val()
                    , Agency_State: jQuery("#drp_Agency_State").val()
                    , Agency_Zip: jQuery("#txt_Agency_Zip").val()
                    , Agency_Status: jQuery("#drp_Agency_Status").val()
                    , agency_action_status: jQuery("#agency_action_status").val()
                     , Notes: jQuery("#txt_agency_notes").val()
                }
                $.ajax({
                    type: "POST",
                    url: agency_add_Url,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(agency),
                    datatype: "json",
                    success: function (data) {
                        $("#drp_Broker_Agency_ID  option[value='0']").remove();
                        var action = data[0];
                        if (action.Agency_Name == 'action') {
                            window.location = "/Maintenance/Agency_List";
                        } else {
                            var str = '';
                            for (var i = 0; i < data.length; i++) {
                                var agency = data[i];
                                $("#drp_Broker_Agency_ID").append($("<option></option>").val(0).html(agency.Agency_Name));
                            }
                            $("#drp_Broker_Agency_ID").val(0);
                            $(".close").click();
                        }

                    },
                    error: function (data) {
                        alert("Loading Faild.");
                    }
                });
            }
        });
        $("#Agency_reset").click(function () {
            $("#Agency_Id").val("");
            $("#txt_Agency_Name").val("");
            $("#txt_Agency_Phone").val("");
            $("#txt_Agency_Addr1").val("");
            $("#txt_Agency_Addr2").val("");
            $("#txt_Agency_City").val("");
            $("#drp_Agency_State").val("");
            $("#txt_Agency_Zip").val("");
            $("#drp_Agency_Status").val("1");
            $("#txt_agency_notes").val("");
        });

    });
});

//2.Assistance
$(document).ready(function () {
    //Edit
    $("#asst_reset").click(function () {
        $("#drp_Broker").val("");
        $("#txt_Assistant_FName").val("");
        $("#txt_Assistant_LName").val("");
        $("#txt_Assistant_PriPhn").val("");
        $("#txt_Assistant_SecPhn").val("");
        $("#txt_Username").val("");
        $("#txt_Assistant_password").val("");
        $("#txt_Assistant_con_password").val("");
        $("#drp_Assistant_Status").val("");
    });

    //List
    var Assistance_Edit = '/Maintenance/Assistance_Edit';
    $(".Assistance_Edit").click(function () {

        var $buttonclicked = $(this);
        var cat_id = $buttonclicked.attr('data-id');
        $.ajax({
            type: "Get",
            url: Assistance_Edit,
            contentType: "application/json; charset=utf-8",
            data: { "Asst_ID": cat_id },
            datatype: "json",
            success: function (data) {
                $(".modal-body").html(data);
                $("#modal_visible").click();
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });

});

//3.Broker
$(document).ready(function () {
    //List
    $('.broker').click(function () {
        var Bro_Id = $(this).attr('data-id');
        var Bro_Name = $(this).attr('dataname');
        var Broker_Select = '/Maintenance/Broker_Select';
        $.ajax({
            type: "Get",
            url: Broker_Select,
            contentType: "application/json; charset=utf-8",
            data: { "Bro_Id": Bro_Id, "Bro_Name": Bro_Name },
            datatype: "json",
            success: function (response) {
                if (response == "1") {
                    window.location = "/Maintenance/Assistance_List";
                }
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });
});

//4.Employer
$(document).ready(function () {
    //Master page Employer grid
    $('.emp_process').click(function () {
        var Emp_Id = $(this).attr('dataid');
        var Emp_Name = $(this).attr('dataname');
        var selector = $(this).attr('dataselector');
        var edit = '/Maintenance/Employer_Select';
        $.ajax({
            type: "Get",
            url: edit,
            contentType: "application/json; charset=utf-8",
            data: { "Emp_Id": Emp_Id, "Emp_Name": Emp_Name },
            datatype: "json",
            success: function (response) {
                if (response == "1") {
                    if (selector == "proposals") {
                        window.location = "/Proposals/Proposals_List";
                    } else {
                        window.location = "/Orders/orders";
                    }
                }
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });
});

//5Staff
$(document).ready(function () {
    //List
    var Staff_Edit = '/Maintenance/Staff_Edit';
    $(".Staff_Edit").click(function () {

        var $buttonclicked = $(this);
        var cat_id = $buttonclicked.attr('data-id');
        $.ajax({
            type: "Get",
            url: Staff_Edit,
            contentType: "application/json; charset=utf-8",
            data: { "Staff_ID": cat_id },
            datatype: "json",
            success: function (data) {
                $(".modal-body").html(data);
                $("#modal_visible").click();
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });

    //Edit
    var staff_add_Url = '/Maintenance/Staff_Edit';
    $("#Staff_add").click(function () {
        if (staff_validate() == true) {
            var ServiceStaff = {
                Staff_ID: jQuery("#Staff_ID").val()
                , Staff_FName: jQuery("#txt_Staff_FName").val()
                , Staff_LName: jQuery("#txt_Staff_LName").val()
                , Staff_Addr1: jQuery("#txt_Staff_Addr1").val()
                  , Staff_Addr2: jQuery("#txt_Staff_Addr2").val()
                , Staff_City: jQuery("#txt_Staff_City").val()
                , Staff_State: jQuery("#txt_Staff_State").val()
                  , Staff_Zip: jQuery("#txt_Staff_Zip").val()
                  , Staff_Role_ID: jQuery("#drp_Staff_Role").val()
                , Staff_Phone: jQuery("#txt_Staff_Phone").val()
                , Staff_Email: jQuery("#txt_Username").val()
                , Staff_password: jQuery("#txt_Staff_password").val()
                , Staff_Status: jQuery("#drp_Staff_Status").val()
            }
            $.ajax({
                type: "POST",
                url: staff_add_Url,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(ServiceStaff),
                datatype: "json",
                success: function (data) {
                    window.location = "/Maintenance/Staff";
                    //$(".close").click();
                    //$(".modal-content").hide();
                },
                error: function (data) {
                    alert("Loading Faild.");
                }
            });
        }

    });
    $("#btn_Staff_clear").click(function () {
        $("#txt_Staff_FName").val("");
        $("#txt_Staff_LName").val("");
        $("#txt_Staff_Addr1").val("");
        $("#txt_Staff_Addr2").val("");
        $("#txt_Staff_City").val("");
        $("#txt_Staff_State").val("");
        $("#txt_Staff_Zip").val("");
        $("#txt_Username").val("");
        $("#txt_Staff_password").val("");
        $("#drp_Staff_Role").val("");
        $("#txt_Staff_Phone").val("");
        $("#drp_Staff_Status").val("");
    });

    function staff_validate() {
        var Staff_FName = $("#txt_Staff_FName").val();
        var Staff_LName = $("#txt_Staff_LName").val();
        var Staff_Addr1 = $("#txt_Staff_Addr1").val();
        var Staff_Addr2 = $("#txt_Staff_Addr2").val();
        var Staff_City = $("#txt_Staff_City").val();
        var Staff_State = $("#txt_Staff_State").val();
        var Staff_Zip = $("#txt_Staff_Zip").val();
        var Staff_Role_ID = $("#drp_Staff_Role").val();
        var Staff_Phone = $("#txt_Staff_Phone").val();
        var Staff_Email = $("#txt_Username").val();
        var Staff_password = $("#txt_Staff_password").val();
        var Staff_Status = $("#drp_Staff_Status").val();
        var i = 0;
        if (Staff_FName == "") {
            i = 1;
            $("#Staff_FName").text("Enter First Name");
        }
        if (Staff_LName == "") {
            i = 1;
            $("#Staff_LName").text("Enter Last Name");
        }
        if (Staff_Addr1 == "") {
            i = 1;
            $("#Staff_Addr1").text("Enter Address");
        }
        if (Staff_City == "") {
            i = 1;
            $("#Staff_City").text("Enter City");
        }
        if (Staff_State == "") {
            i = 1;
            $("#Staff_State").text("Enter State");
        }
        if (Staff_Zip == "") {
            i = 1;
            $("#Staff_Zip").text("Enter ZIP");
        }
        if (Staff_Role_ID == "") {
            i = 1;
            $("#Staff_Role_ID").text("Select Role");
        }
        if (Staff_Phone == "") {
            i = 1;
            $("#Staff_Phone").text("Enter Phone Number");
        }
        if (Staff_Email == "") {
            i = 1;
            $("#Staff_Email").text("Enter Email");
        }
        if (Staff_Email != "") {
            if (!Email_Validation('txt_Username')) {
                i = 1;
                $("#Staff_Email").text(" Enter Valid Username");
            }
        }
        if (Staff_password == "") {
            i = 1;
            $("#Staff_password").text("Enter Password");
        }
        if (Staff_Status == "") {
            i = 1;
            $("#Staff_Status").text("Select Status");
        }

        if (i == 1) {
            return false;
        }
        else {
            return true;
        }
    }

});

//Site
$(document).ready(function () {
    //faq list
    var faq_Edit = '/Site/faq_Edit';
    $(".faq_Edit").click(function () {

        var $buttonclicked = $(this);
        var cat_id = $buttonclicked.attr('data-id');
        $.ajax({
            type: "Get",
            url: faq_Edit,
            contentType: "application/json; charset=utf-8",
            data: { "faq_ID": cat_id },
            datatype: "json",
            success: function (data) {
                $(".modal-body").html(data);
                $("#modal_visible").click();
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });
    var delete_faq = "/Site/faq_delete";
    $(".faq_delete").click(function () {
        if (confirm("Are you sure want to delete this FAQ?")) {
            var $buttonclicked = $(this);
            var cat_id = $buttonclicked.attr('data-id');
            $.ajax({
                type: "Get",
                url: delete_faq,
                contentType: "application/json; charset=utf-8",
                data: { "faq_ID": cat_id },
                datatype: "json",
                success: function (response) {
                    window.location = "/Site/faq";
                    alert("Deleted Successfully");
                },
                error: function (data) {
                    alert("Loading Faild.");
                }
            });
        }
    });

    //faq validation
    function faq_validation() {
        var category = $("#drp_category").val();
        var question = $("#txt_question").val();
        var descrip = $(".note-editable").html();
        var i = 0;
        if (category == "") {
            i = 1;
            $("#category").text("Select Category Type");
        }
        if (question == "") {
            i = 1;
            $("#ques").text("Enter Question. ");
        }
        if (descrip == "") {
            i = 1;
            $("#desc").text("Enter Description ");
        }
        if (i == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    //faq action
    var faq_add_Url = '/Site/faq_action';
    $("#faq_add").click(function () {

        if (faq_validation() == true) {
            //alert(jQuery("#txt_question").val())
            //alert(jQuery('#txt_descriptions').val())
            var faq = {
                faq_ID: jQuery("#Id").val()
                 , questions: jQuery("#txt_question").val()
                 , descriptions_str: $(".note-editable").html()
                , MainPageID: jQuery("#drp_category").val()
            }
            $.ajax({
                type: "POST",
                url: faq_add_Url,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(faq),
                //data: JSON.stringify(Employee_Attendance),
                datatype: "json",
                success: function (response) {
                    window.location = "/Site/Faq";
                },
                error: function (data) {
                    alert("Loading Faild.");
                }
            });
        }
    });
    $("#faq_reset").click(function () {

        $("#txt_question").val("");
        $("#drp_category").val("");
        $("#txt_descriptions").val("");
        $(".note-editable").html("");
    });

    //broucher gallery
    function Video_validation() {
        var type = $("#drp_type").val()
        var header = $("#txt_header").val()
        var fileExt = $("#File").val();
        fileExt = fileExt == "" ? $("#filepath_hidden_temp").val() : fileExt;
        var ext = fileExt.split('.').pop();
        var i = 0;
        if (type == "") {
            i = 1;
            $("#type").text("Select Gallery Type");
        }
        if (header == "") {
            i = 1;
            $("#header").text("Enter Header ");
        }
        if (type == "1") {
            if (ext == "JPG" || ext == "jpg" || ext == "png" || ext == "PNG") {
                $("#FileVal").text("");
            } else {
                i = 1;
                $("#FileVal").text("Invalid File Format (.PNG .JPG, ect)");
            }
        }
        if (type == "0") {
            if (ext == "MP4" || ext == "mp4" || ext == "3gp" || ext == "3GP") {
                $("#FileVal").text("");
            } else {
                i = 1;
                $("#FileVal").text("Invalid File Format (.MP4 .3GP, ect)");
            }
        }
        if (i == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    $("#btn_gallery_clear").click(function () {
        $("#drp_type").val(1);
        $("#txt_header").val("");
        $("#filepath_hidden_temp").val("");
        $("#filepth").html("");
        $("#txt_Video_Desc").val("");
        $("#removeFile").removeClass("fileinput input-group fileinput-exists");
        $("#removeFile").addClass("fileinput fileinput-new input-group");
        $("#selected_file_name").empty();
    });
    var video_add_Url = '/Site/Video_Action';
    $("#video_add").click(function () {
        if (Video_validation() == true) {
            $('#video_add').hide();
            $('.loader').show();
            var RequestForm = "";
            var fileUpload = $("#File").get(0);
            var files = fileUpload.files;

            var fileData = new FormData();
            for (var i = 0; i < files.length; i++) {
                fileData.append(files[i].name, files[i]);
            }
            fileData.append('TEXT', 'sa');
            $.ajax({
                url: '/Administrator/FileUpload', type: "POST", processData: false,
                contentType: false,
                processData: false,
                data: fileData,
                success: function (result) {
                    RequestForm = result == "" ? $("#filepath_hidden_temp").val() : result;
                    var Video_brochour = {
                        video_ID: jQuery("#Id").val()
                         , video_type: jQuery("#drp_type").val()
                         , video_header: jQuery("#txt_header").val()
                        , video_file_name: jQuery("#txt_filename").val()
                          , video_file_path: RequestForm
                        , video_descriptions: jQuery("#txt_Video_Desc").val()

                    }
                    $.ajax({
                        type: "POST",
                        url: video_add_Url,
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(Video_brochour),
                        datatype: "json",
                        success: function (data) {
                            $('.loader').hide();
                            $('#video_add').show();
                            window.location = '/Site/video_gallery';
                        },
                        error: function (data) {
                            alert("Loading Faild.");
                        }
                    });
                },
                error: function (er) { }

            });
        }
    })

    //video gallery
    var add_new_gallery = '/Site/Video_Edit';
    $(".Video_Edit").click(function () {
        var $buttonclicked = $(this);
        var cat_id = $buttonclicked.attr('data-id');
        $.ajax({
            type: "Get",
            url: add_new_gallery,
            contentType: "application/json; charset=utf-8",
            data: { "video_ID": cat_id },
            datatype: "json",
            success: function (data) {
                $(".modal-body").html(data);
                $("#modal_visible").click();
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });
    var delete_video = '/Site/Video_Delete';
    $(".Video_Delete").click(function () {
        if (confirm("Are you sure want to delete this Record?")) {
            var $buttonclicked = $(this);
            var cat_id = $buttonclicked.attr('data-id');
            $.ajax({
                type: "Get",
                url: delete_video,
                contentType: "application/json; charset=utf-8",
                data: { "video_ID": cat_id },
                datatype: "json",
                success: function (response) {
                    window.location = "/Site/video_gallery";
                    alert("Deleted Successfully");
                },
                error: function (data) {
                    alert("Loading Faild.");
                }
            });
        }
    });
});

//Proposal
$(document).ready(function () {
    
    $('._Proposal').click(function () {
        $('#Proposal_details').empty();
        $('#detailsDiv').hide();
        $('#hide_proposal_details').hide();
        $('#show_proposal_details').show();
        var code = $(this).attr('data-code');
        $('.code').text(code);
        $('#hdn_proposal_id').val($(this).attr('value'));
        $("#drp_Employer").empty();
        $.getJSON("/Proposals/EmployerList", function (data) {
            $('<option value="">').html('Select Employer').appendTo("#drp_Employer");
            $.each(data, function (i, data) {      // bind the dropdown list using json result
                $('<option>',
                   {
                       value: data.Value,
                       text: data.Text
                   }).html(data.Text).appendTo("#drp_Employer");
            });
        })
        $("#modal_visible").click();
    });

    $('.download_proposal').click(function () {
        var pid = $(this).val();
        var url = '/Proposals/dowload_Proposal?Proposal_Id=' + pid;
        window.open(url, 'popup_window', 'width=700,height=500,left=300,top=100,resizable=yes');
    });

});

//Pagination for all pages
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('.sort').show();
    $('#' + localStorage.sortId).hide();
    localStorage.sortId = null;
    $('.sort').click(function () {
        var sort = $(this).attr("id");
        $("#sort").val(sort);
        localStorage.sortId = sort;
        if (CalculateAndSetPage('First'))
            $('form').submit();
    });

    function CalculateAndSetPage(movingtype) {
        var count = parseInt($('#drp_count').val());
        var currentPage = parseInt($('#CurrentPage').val());
        var lastpage = parseInt($('#LastPage').val());
        var search = $('#txtsearch').val();
        var total_row = $('#hid_rowcount').val();

        lastpage = total_row;

        if (currentPage == 1 && movingtype == "Previous") {
            return false;
        }
        if (currentPage == lastpage && movingtype == 'Next')
            return false;

        if (movingtype == 'First')
            currentPage = 1;
        else if (movingtype == 'Previous')
            currentPage--;
        else if (movingtype == 'Next')
            currentPage++;
        else if (movingtype == 'Last')
            currentPage = lastpage;
        else
            alert('');
        $('#CurrentPage').val(currentPage);
        $('#Count').val(count);
        $('#drp_count').val(count);
        $('#Search').val(search)
        $("#current_page").text(currentPage);
        return true;
    }
});


//Assistance Validation Fuction
function asst_validation() {
    var bro_id = $("#drp_Broker").val();
    var b_fname = $("#txt_Assistant_FName").val();
    var b_lname = $("#txt_Assistant_LName").val();
    var b_phone = $("#txt_Assistant_PriPhn").val();
    var b_sphone = $("#txt_Assistant_SecPhn").val();
    var b_email = $("#txt_Username").val();
    var b_pwd = $("#txt_Assistant_password").val();
    var b_cpwd = $("#txt_Assistant_con_password").val();
    var status = $('#drp_Assistant_Status').val();

    var i = 0;
    if (bro_id == "") {
        i = 1;
        $("#lb_bro_id").text("Select Broker");
    }
    if (b_fname == "") {
        i = 1;
        $("#b_fname").text("Enter First Name");
    }
    if (b_lname == "") {
        i = 1;
        $("#b_lname").text("Enter Last Name");
    }
    if (b_phone == "") {
        i = 1;
        $("#b_phone").text("Enter Phone Number");
    }
    if (b_email == "") {
        i = 1;
        $("#b_email").text("Enter Email");
    }
    if (b_email != "") {
        if (!Email_Validation('txt_Username')) {
            i = 1;
            $("#b_email").text(" Enter Valid Email");
        }
    }
    if (b_pwd == "") {
        i = 1;
        $("#b_pwd").text("Enter Password");
    }
    if (b_cpwd == "") {
        i = 1;
        $("#b_cpwd").text("Enter Confirm Password");
    }
    if (b_cpwd != "") {
        if (b_pwd != b_cpwd) {
            i = 1;
            $("#b_cpwd").text("Password does not match");
        }
    }
    if (status == "") {
        i = 1;
        $("#err_status").text("Select Status");
    }
    if (i == 0) {
        return true;
    }
    else {
        return false;
    }
}
