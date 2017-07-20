$(document).ready(function () {

    var CrntYr = new Date().getFullYear();
    for (i = 1; i <= 12; i++) {
        $("#ddl_month").append($("<option></option>").val(i.toString().length == 1 ? '0' + i : i).html(i));
    }
    for (i = CrntYr; i <= (CrntYr + 13) ; i++) {
        var str = i.toString();
        $("#ddl_year").append($("<option></option>").val(str.substring(2)).html(i));
    }

	
    ///OrderDetails
    //Payment status
    $("#Track_invoice1").click(function () {
        var oid = $(this).val();
        window.open('/Orders/Invoice?ORD_Id=' + oid, 'popup_window', 'width=700,height=500,left=300,top=100,resizable=yes');
    });
	drp_Order_Status_ID();
    $('#btn_makepayment').click(function () {
        if (PaymentInputValidation() != false) {
            $('#blockbtn5').click();
            $("#block_loader").html("Please be patient while your transaction is being processed.<br/>Do not 'close' window or press 'refresh' or browser 'back/forward' button.");
            var orderid = getUrlParameterByName('ORD_Id');//getUrlVars()["ORD_Id"];
            var Payment = {
                Order_ID: orderid,
                CardNumber: $('#txt_creditcard_number').val(),
                ExpiryDate: $('#ddl_month').val() + $('#ddl_year').val(),
                CvvNumber: $('#txt_cvv').val()
            }

            $.ajax({
                type: "POST",
                url: '/Orders/Online_Payment_Credit',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(Payment),
                datatype: "json",
                success: function (response) {
                    $('#unblockbtn5').click();
                    if (response == "1") {
                        alert("Your transaction has been Successful.")
                        window.location.href = '/Orders/OrderDetails?ORD_Id=' + orderid;
                    }
                    else if (response == "2") {
                        $('#Err_Credit').text("Your transaction has been Declined.");
                    }
                    else if (response == "6") {
                        $('#Err_Credit').text("Your credit card number is invalid.");
                    }
                    else if (response == "8") {
                        $('#Err_Credit').text("Your credit card has expired.");
                    }
                    else if (response == "11") {
                        $('#Err_Credit').text("A duplicate transaction has been submitted.");
                    } else {
                        $('#Err_Credit').text(response);
                    }
                },
                error: function (data) {
                    alert("Loading Faild.");
                }
            });
        }
    });
    $('#btn_makepayment_inhouse').click(function () {
        //var Bill_No = $('#txt_bill_number').val();
        //if (Bill_No != "") {
            $('#blockbtn5').click();
            $("#block_loader").html("Please be patient while your transaction is being processed.<br/>Do not 'close' window or press 'refresh' or browser 'back/forward' button.");
            Od_GetInvoice();
            //Od_GetInvoice(Bill_No);
        //}
        //else
        //{
        //    $('#Err_Inhouse').text("Enter Bill Number");
        //}
    });
    $('#Od_drp_Order_Status_ID').change(function () {
        drp_Order_Status_ID();
    });
    ///GenerateOrder
    var total_items = 0;
    $(".GenerateOrder_prlist").each(function () {
        total_items = total_items + 1;
        $('#lbl_no_of_items1').html("0/" + total_items);
    });

    $(".GenerateOrder_chk_service").click(function () {
        GenerateOrder_myFunction();
    });
    //$('#GenerateOrder_drp_Employer').change(function () {
    //    var Emp_Id = $(this).val();
    //    var Emp_Name = $('#GenerateOrder_drp_Employer option:selected').text();
    //    var edit = '/Maintenance/Employer_Select';
    //    $('#emp_name').html(Emp_Name);
    //    $.ajax({
    //        type: "Get",
    //        url: edit,
    //        contentType: "application/json; charset=utf-8",
    //        data: { "Emp_Id": Emp_Id, "Emp_Name": Emp_Name },
    //        datatype: "json",
    //        success: function (response) {
    //            if (response == "1") 
    //{
    //            }
    //        },
    //        error: function (data) {
    //            alert("Loading Faild.");
    //        }
    //    });
    //});
    $('#GenerateOrder_drp_Employer').change(function () {
        //if ($('#GenerateOrder_drp_Employer').val() == null || $('#GenerateOrder_drp_Employer').val() == "")
        //{
        //    $('#Err_span').text("Please Select Employer");
        //    return false;
        //}
        $('#loader').show();
        $('#GenerateOrder_drp_Pricing').val("");
        var emp_id = $('#GenerateOrder_drp_Employer').val();
        var pricing_id = null;
        get_pricingTier(emp_id, pricing_id);
        var Emp_Id = $(this).val();
        var Emp_Name = $('#GenerateOrder_drp_Employer option:selected').text();
        var edit = '/Maintenance/Employer_Select';
        $.ajax({
            type: "Get",
            url: edit,
            contentType: "application/json; charset=utf-8",
            data: { "Emp_Id": Emp_Id, "Emp_Name": Emp_Name },
            datatype: "json",
            success: function (response) {
                if (response == "1") {

                }
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    });
    $('#GenerateOrder_drp_Pricing').change(function () {
        $('#loader').show();
        var emp_id = $('#GenerateOrder_drp_Employer').val();
        var pricing_id = $('#GenerateOrder_drp_Pricing').val();
        get_pricingTier(emp_id, pricing_id);
    });
    ///OrderConfirm
    OrderConfirm_Summary_Function();
    $('#drp_Order_Status_ID').change(function () {
        var Order_Status_ID = $('#drp_Order_Status_ID option:selected').val();
        if (Order_Status_ID == "5") {
            $('#Or_Action').removeClass('row hide').addClass('row');
            $('#Or_fileselect').removeClass('row').addClass('row hide');
        }
        else if (Order_Status_ID == "6") {
            $('#Or_Action').removeClass('row').addClass('row hide');
            $('#Or_fileselect').removeClass('row hide').addClass('row');
        }
        else {
            $('#Or_Action').removeClass('row').addClass('row hide');
            $('#Or_fileselect').removeClass('row').addClass('row hide');
        }
    });
    $('.OrderConfirm_txt_Quantity').change(function () {
        OrderConfirm_Summary_Function();
    });
    ///GenerateInvoice
    var myDate = new Date();
    var prettyDate = (myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' + myDate.getFullYear();

    $("#Invoice_date").html(prettyDate);
    $("#Due_date").html(prettyDate);

    $("#print").click(function () {
        var mode = 'iframe'; //popup
        var close = mode == "popup";
        var options = { mode: mode, popClose: close };
        $("div.printableArea").printArea(options);
    });

});
function drp_Order_Status_ID()
{
    var Order_Status_ID = $('#Od_drp_Order_Status_ID option:selected').val();
    if (Order_Status_ID == "5") {
        $('#Or_Action').removeClass('row hide').addClass('row');
        $('#Or_fileselect').removeClass('row').addClass('row hide');
    }
    else if (Order_Status_ID == "6") {
        $('#Or_Action').removeClass('row').addClass('row hide');
        $('#Or_fileselect').removeClass('row hide').addClass('row');
    }
    else {
        $('#Or_Action').removeClass('row').addClass('row hide');
        $('#Or_fileselect').removeClass('row').addClass('row hide');
    }
}
function get_pricingTier(emp_id, pricing_id) {
    $.ajax({
        type: "GET",
        url: "/Orders/get_PricingTier",
        contentType: "application/json; charset=utf-8",
        data: { "Emp_Id": emp_id, "Pricing_Id": pricing_id },
        datatype: "json",
        success: function (data) {
            $('#frm-author').html(data);
            $('#loader').hide();
            $(".panel-collapse").addClass("in");
        },
        error: function (data) {
            alert("Loading Faild.");
        }
    });
}
///GenerateOrder Fuctions
function GenerateOrder_myFunction() {
    var total_items = 0;
    var selected_items = 0;
    var no_of_items = 0;
    var sub_total = 0.00;
    var rush_fee = 0.00;
    var order_total = 0.00;
    var items_percent = 0;
    $(".GenerateOrder_prlist").each(function () {
        total_items = total_items + 1;
    });
    $('#lbl_final').html(0.00);
    $('#lbl_no_of_items1').html("0/" + total_items);
    $('#lbl_no_of_items2').html(0);
    $('#lbl_subtotal').html(0.00);
    $('#lbl_rushfee').html(0.00);
    $('#lbl_order_total').html(0.00);
    $('#lbl_percent').html(0);
    $("#w3s").attr("style", "width:0%;");

    $(".GenerateOrder_prlist").each(function () {
        if ($(this).find('.GenerateOrder_chk_service').prop('checked') == true) {
            selected_items = selected_items + 1;
            var temp_service_price = parseFloat($(this).find('.hdn_service_price').val());
            var temp_Rushfee = parseFloat($(this).find('.hdn_Service_Rush_Fee').val());
            var temp_items_count = parseFloat($(this).find('.dropdown option:selected').text());
            sub_total = sub_total + (temp_service_price * temp_items_count);
            rush_fee = rush_fee + temp_Rushfee;
            no_of_items = no_of_items + temp_items_count;
            order_total = sub_total + rush_fee;
            $('#lbl_final').html(order_total);
            $('#lbl_no_of_items1').html(selected_items + "/" + total_items);
            $('#lbl_no_of_items2').html(no_of_items);
            $('#lbl_subtotal').html(sub_total);
            $('#lbl_rushfee').html(rush_fee);
            $('#lbl_order_total').html(order_total);
            items_percent = (selected_items / total_items) * 100;
            items_percent = Math.ceil(items_percent);
            $('#lbl_percent').html(items_percent);
            $("#w3s").attr("style", "width:" + items_percent + "%;");
        }
    });

}

function GenerateOrder_GetOrder() {
    if (GenerateOrder_Chk_Validation() != false) {
        var ListService = [];
        var service = {};
        $(".GenerateOrder_prlist").each(function () {
            if ($(this).find('.GenerateOrder_chk_service').prop('checked') == true) {
                var service_id = $(this).find('.hdn_service_Id').val();
                var temp_items_count = parseFloat($(this).find('.dropdown option:selected').text());
                var temp_Pricing_ID = $('#hdn_pricing_id').val();
                var service = {
                    Service_ID: service_id,
                    Quantity: temp_items_count,
                    Pricing_ID: temp_Pricing_ID,
                };
                ListService.push(service);
            }
        });
        var generate_order = '/Orders/Generate_Orders';
        $.ajax({
            type: "POST",
            url: generate_order,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(ListService),
            datatype: "json",
            success: function (response) {
                if (response != "0") {
                    var orderid = response;
                    window.location.href = '/Orders/OrderConfirm?ORD_Id=' + orderid;
                }
                else {
                    alert("Loading Faild.");
                }
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    }
}

function GenerateOrder_Chk_Validation() {
    var emp = $('#GenerateOrder_drp_Employer').val();
    var pricing = $('#hdn_pricing_id').val();
    if (emp == "" ||emp ==null)
    {
        $('#Err_span').html("Please Select Employer");
        $('#GenerateOrder_drp_Employer').focus();
        return false;
    }
    else if (pricing == "" || pricing == null)
    {
        $('#Err_span').html("Please Select Pricing Tier");
        $('#GenerateOrder_drp_Pricing').focus();
        return false;
    }
    else if (emp != "" && pricing!="")
    {
        return true;
    }
}

///OrderConfirm Fuctions
function OrderConfirm_Finalize_Order() {
    var chck_con = 0;
        var ListService = [];
        var service = {};
        $(".OrderConfirm_prlist").each(function () {
            var service_id = $(this).find('.hdn_service_Id').val();
            var temp_items_count = parseFloat($(this).find('.OrderConfirm_txt_Quantity').val());
            if (temp_items_count <= 0)
            {
                $('#Err_span').text("Quantity must grater than Zero");
                chck_con = 1;
                return false;
            }
            var proposal_id = $(this).find('.hdn_Proposal_ID').val();
            var temp_Pricing_ID = $('#hdn_pricing_id').val();
            var service = {
                Service_ID: service_id,
                Quantity: temp_items_count,
                Proposal_ID: proposal_id,
                Pricing_ID: temp_Pricing_ID,
            };
            ListService.push(service);
        });
        if (chck_con == 1)
        {
            return false;
        }
        $('#blockbtn5').click();
        var generate_order = '/Orders/OrderConfirm';
        $.ajax({
            type: "POST",
            url: generate_order,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(ListService),
            datatype: "json",
            success: function (response) {
                $('#unblockbtn5').click();
                if (response != "0") {
                    var orderid = response;
                    window.location.href = '/Orders/OrderDetails?ORD_Id=' + orderid;
                }
                else {
                    $('#unblockbtn5').click();
                    alert("Loading Faild.");
                }
            },
            error: function (data) {
                $('#unblockbtn5').click();
                alert("Loading Faild.");
            }
        });
}

function OrderConfirm_Chk_Validation() {
    var hdn_Order_Status_ID = $('#hdn_Order_Status_ID').val();
    var Order_Status_ID = $('#drp_Order_Status_ID').val();
    if (hdn_Order_Status_ID < Order_Status_ID) {
        return true;
    }
    else {
        return false;
    }
}

function OrderConfirm_Summary_Function() {
    var no_of_items = 0;
    var sub_total = 0.00;
    var rush_fee = 0.00;
    var discount = 0.00;
    var order_total = 0.00;
    var selected_items = 0;
    $('#lbl_no_of_items').html(0);
    $('#lbl_subtotal').html(0.00);
    $('#lbl_discount').html(0.00);
    $('#lbl_final').html(0.00);
    $('#lbl_order_savings').html(0.00);
    $(".OrderConfirm_prlist").each(function () {

        selected_items = selected_items + 1;
        var temp_service_price = parseFloat($(this).find('.hdn_service_price').val());
        var temp_Discount = parseFloat($(this).find('.hdn_Service_discount_amount').val());
        var temp_items_count = parseFloat($(this).find('.OrderConfirm_txt_Quantity').val());
        var temp_sub_total = (temp_service_price * temp_items_count)- (temp_Discount * temp_items_count);
        $(this).find('.txt_sub_total').text(temp_sub_total);
        sub_total = sub_total + (temp_service_price * temp_items_count);
        rush_fee = rush_fee;
        no_of_items = no_of_items + temp_items_count;
        discount = discount + (temp_Discount * temp_items_count);
        order_total = (sub_total + rush_fee) - discount;
        $('#lbl_final').html(parseFloat(order_total).toFixed(2));
        $('#lbl_no_of_items').html(selected_items);
        $('#lbl_subtotal').html(parseFloat(sub_total).toFixed(2));
        $('#lbl_discount').html(parseFloat(discount).toFixed(2));
        $('#lbl_order_savings').html(parseFloat(discount).toFixed(2));
        //$('#lbl_order_total').html(parseFloat(order_total).toFixed(2));
        $('#product_count').html(selected_items);
    });

}

function OrderConfirm_deleteItem(chk_parent_id) {
    $(chk_parent_id).remove();
    OrderConfirm_Summary_Function();
}

///OrderDetails Fuctions
function Od_GetInvoice() {
    var make_payment = '/Orders/make_payment';
    var orderid = getUrlParameterByName('ORD_Id');//getUrlVars()["ORD_Id"];
    var Payment = {
                    Order_ID: orderid
                    ,Payment_Status: "Pending"
    };
    $.ajax({
        type: "POST",
        url: make_payment,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(Payment),
        datatype: "json",
        success: function (response) {
            if (response != "0") {

                window.location.href = '/Orders/OrderDetails?ORD_Id=' + orderid;
            }
            else {
                alert("Loading Faild.");
            }
        },
        error: function (data) {
            alert("Loading Faild.");
        }
    });
}
function Od_Update_Payment() {
    $('#blockbtn5').click();
    var make_payment = '/Orders/update_payment';
    var orderid = getUrlParameterByName('ORD_Id');//getUrlVars()["ORD_Id"];
    var payment_id = $('#hdn_Payment_Id').val();
    var received_date = $('#txt_payment_date').val();
    var payment_by = $('#drp_Paid_by').val();
    var refund_date = $('.txt_refund_date').val();
    var refund_amount = $('#txt_refund_amount').val();
    if (refund_amount != null && refund_date != null)
    {
        var payment_status="Refunded";
    }
    else
    {
        var payment_status="Success";
    }
    var Payment = {
        Order_ID : orderid,
        Payment_ID: payment_id,
        Payment_By: payment_by,
        Received_Date: received_date,
        Refund_Date: refund_date,
        Refund_Amount: refund_amount,
        Payment_Status: payment_status
    };
    $.ajax({
        type: "POST",
        url: make_payment,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(Payment),
        datatype: "json",
        success: function (response) {
            if (response != "0") {
                window.location.href = '/Orders/OrderDetails?ORD_Id=' + orderid;
            }
            else {
                alert("Loading Faild.");
            }
        },
        error: function (data) {
            alert("Loading Faild.");
        }
    });
}
function Add_Final_Download_file() {
    var selectedFile = ($("#txt_final_UploadFile"))[0].files[0];//FileControl.files[0];
    var fileUpload = $("#txt_final_UploadFile").get(0);
    var files = fileUpload.files;
    // Create FormData object
    var fileData = new FormData();

    // Looping over all files and add it to FormData object
    for (var i = 0; i < files.length; i++) {
        fileData.append(files[i].name, files[i]);
    }

    // Adding one more key to FormData object
    fileData.append('username', "James");
    $.ajax({
        url: '/Orders/FileUpload',
        async: false,
        type: "POST",
        contentType: false, // Not to set any content header
        processData: false, // Not to process data
        data: fileData,
        success: function (response) {
            download_id = response.Download_Id;
        },
        error: function (err) {
            return 0;
        }
    });
    return download_id;
}
function Od_Update_Order() {
    var hdn_Order_Status_ID = $('#hdn_Order_Status_ID').val();
    var Order_Status_ID = $('#Od_drp_Order_Status_ID').val();
    var Order_Action_ID = null;
    if (hdn_Order_Status_ID < Order_Status_ID) {
        var orderid = getUrlParameterByName('ORD_Id');//getUrlVars()["ORD_Id"];
        var order_notes = $('#txt_Order_Notes').val();
        if (Order_Status_ID=="6")
        {
            var orderNoteMessage = "Your order is ready. kindly find the attached documents.";
            var orderNoteDownloadId = 0;
            orderNoteDownloadId = Add_Final_Download_file();
            var orderNoteDisplayToCustomer = true;
            var Order_Note = {
                OrderId: orderid,
                Note: orderNoteMessage,
                DownloadId: orderNoteDownloadId,
                DisplayToCustomer: orderNoteDisplayToCustomer
            };
            $.ajax({
                type: "POST",
                url: '/Orders/Add_Order_Note',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(Order_Note),
                datatype: "json",
                success: function (data) {
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert('Failed to add order note.');
                }
            });
        }
        else if (Order_Status_ID == "5")
        {
            Order_Action_ID = $('#Od_drp_Order_Action').val()
        }
        var Order_Status = {
            Order_Status_ID: Order_Status_ID
           , Order_Action_ID: Order_Action_ID
           , Order_ID: orderid
           , Order_notes: null
           , Order_DeliverFilename: ""
        };
        var update_order_url = '/Orders/Update_Orders';
        $.ajax({
            type: "POST",
            url: update_order_url,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(Order_Status),
            datatype: "json",
            success: function (response) {
                if (response != "0") {
                    //var orderid = response;
                    var url = window.location.pathname;
                    url = url + "?ORD_Id=" + orderid;
                    window.location = url;
                }
                else {
                    swal("Cancelled", "Loading Faild.", "error");
                }
            },
            error: function (data) {
                swal("Cancelled", "Loading Faild.", "error");
            }
        });
    }
    else if (hdn_Order_Status_ID == Order_Status_ID) {
        swal("Cancelled", "Invalid Order Status.", "error");
        $('#Od_drp_Order_Status_ID').focus();
    }
    else {
        swal("Cancelled", "Invalid Order Status.", "error");
        $('#Od_drp_Order_Status_ID').focus();
    }
}

function Od_Chk_Validation() {
    var hdn_Order_Status_ID = $('#hdn_Order_Status_ID').val();
    var Order_Status_ID = $('#Od_drp_Order_Status_ID').val();
    if (hdn_Order_Status_ID <= Order_Status_ID) {
        return true;
    }
    else {
        return false;
    }
}

function MakePayment() {
    if ($('#drp_Broker_Paymethod_ID').val() == "2") {
        var CrntYr = new Date().getFullYear();
        for (i = 1; i <= 12; i++) {
            $("#ddl_month").append($("<option></option>").val(i.toString().length == 1 ? '0' + i : i).html(i));
        }
        for (i = CrntYr; i <= (CrntYr + 13) ; i++) {
            var str = i.toString();
            $("#ddl_year").append($("<option></option>").val(str.substring(2)).html(i));
        }
        $('#payDetDiv').slideUp();
        $('#payGateDiv').show();
    } else if ($('#drp_Broker_Paymethod_ID').val() == "1") {
        $('#payDetDiv').slideUp();
        $('#payInHouseDiv').show();
        //Od_GetInvoice();
    }
}

function cancelPayment() {
    $('#payDetDiv').slideDown();
    $('#payInHouseDiv').slideUp();
    $('#payGateDiv').slideUp();
}

function PaymentInputValidation() {
    var cardnumber = $('#txt_creditcard_number').val();
    var expirymonth = $('#ddl_month').val();
    var expiryyear = $('#ddl_year').val();
    var cvv = $('#txt_cvv').val();
    var name = $('#txt_name').val();
    var i = 0;
    if (cardnumber == "") {
        i = 1;
        $('#Err_Credit').text("Enter the Credit Card Number");
    }
    if (expirymonth == "" || expiryyear == "") {
        i = 1;
        $('#Err_Expiry').text("Select the Expiry Month and Year");
    }
    if (cvv == "") {
        i = 1;
        $('#Err_Cvv').text("Enter the CVV No.");
    }
    if (name == "") {
        i = 1;
        $('#Err_Name').text("Enter the Card Holder's Name");
    }
    if (cardnumber != "") {
        if ($.isNumeric(cardnumber) == false) {
            i = 1;
            $('#Err_Credit').text("Credit Card No. should be Numeric");
        }
        else if (cardnumber.length > 16 || cardnumber.length < 13) {
            i = 1;
            $('#Err_Credit').text("Credit Card No. lenth should be 13 to 16");
        }
    }
    if (cvv != "") {
        if ($.isNumeric(cvv) == false) {
            i = 1;
            $('#Err_Cvv').text("CVV No. should be Numeric");
        }
        else if (cvv.length > 4 || cvv.length < 3) {
            i = 1;
            $('#Err_Cvv').text("CVV No. lenth should be 3 to 4");
        }
    }

    if (i == 1)
        return false;
    else
        return true;
}


