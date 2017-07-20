
!function($) {
    "use strict";

    var SweetAlert = function() {};

    //examples 
    SweetAlert.prototype.init = function() {
        
    //Basic
    $('#sa-basic').click(function(){
        swal("Here's a message!");
    });

    //A title with a text under
    $('#sa-title').click(function(){
        swal("Here's a message!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed.")
    });

    //Success Message
    $('#sa-success').click(function(){
        swal("Good job!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat eleifend ex semper, lobortis purus sed.", "success")
    });

    //Warning Message
    $('#sa-warning').click(function () {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {
            swal("Deleted!", "Your imaginary file has been deleted.", "success");
        });
    });

        //Warning Message
    $('.delete').click(function () {
        var id = $(this).attr('data-id');
        var flag = $(this).attr('data-type');
        var name = $(this).attr('dataname');
        var action = $(this).attr('actionname');
        swal({
            title: "Are you sure?",
            text: "You want to detete the " + flag + "<span style='color:#337ab7;font-weight: bold;'> " + name + "</span>",
            type: "warning",
            showCancelButton: true,
            html: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {
            $.ajax({
                type: "GET",
                url: "/Maintenance/Delete",
                contentType: "application/json; charset=utf-8",
                data: { "ID": id, "flag": flag },
                datatype: "json",
                success: function (response) {
                    if (response == "1") {
                        swal({
                            title: "Deleted!",
                            text: flag + " " + name + " has been deleted",
                            type: "success"
                        }, function () {
                            window.location = action;
                        });
                        
                    } else {
                        swal("Cancelled", "deletion unsuccessful", "error");
                    }
                }
            });
        });
    });

        //order Notes
    $('.note_read_more').click(function () {
        var note = $(this).attr("value");
        swal("Notes!", note)
    });
		//order notes delete
	$('.btn_note_delete').click(function () {
		var orderid = $("#hdn_order_id").val();
		var noteid = $(this).attr("value");
		var Order_Note = {
			Id: noteid
		};
		swal({
			title: "Are you sure?",
			text: "You want to detete the notes ",
			type: "warning",
			showCancelButton: true,
			html: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: false
		}, function () {
			$.ajax({
				type: "POST",
				url: '/Orders/Add_Order_Note',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(Order_Note),
				datatype: "json",
				success: function (data) {
					swal({
						title: "Deleted!",
						text: " Order note deleted successfully.",
						type: "success"
					}, function () {
						var url = window.location.pathname;
						url = url + "?ORD_Id=" + orderid + '&noteadd=success';
						window.location = url;
					});
				}
			});
		});
	});
        //Order details
	$('#btnSaveOrderStatus').click(function () {
	    var hdn_Order_Status_ID = $('#hdn_Order_Status_ID').val();
	    var Order_Status_ID = $('#Od_drp_Order_Status_ID').val();
	    if (hdn_Order_Status_ID >= Order_Status_ID)
	    {
	        swal("Cancelled", "Invalid Order Status.", "error");
	        $('#Od_drp_Order_Status_ID').focus();
	    }
	    else if (Order_Status_ID == "5" && ($('#Od_drp_Order_Action').val() == "" || $('#Od_drp_Order_Action').val() == null))
	    {
	            swal("Cancelled", "Invalid Order Action.", "error");
	            $('#Od_drp_Order_Action').focus();
	    }
	    else if (Order_Status_ID == "6" && $("#txt_final_UploadFile").val()=='') {
	        swal("Cancelled", "Please Select Final Document.", "error");
	        $('#txt_final_UploadFile').focus();
	    }
	    else {
	        swal({
	            title: "Are you sure?",
	            text: "Do you want to change the order status!",
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#4CAF50",
	            confirmButtonText: "Yes, change it!",
	            cancelButtonText: "No, cancel pls!",
	            closeOnConfirm: false,
	            closeOnCancel: false
	        }, function (isConfirm) {
	            if (isConfirm) {
	                Od_Update_Order();
	                swal("Changed!", "Order status has been changed.", "success");
	            } else {
	                swal("Cancelled", "Order status not changed. :)", "error");
	                $('#Od_drp_Order_Status_ID').focus();
	            }
	        });
	    }
    });
    $('#btnSavePaymentStatus').click(function () {
        if ($('#txt_payment_date').val() == "" || $('#txt_payment_date').val() == null) {
            $('#Error_Msg_Payment').html("Invalid Payment Received Date");
            return false;
        }
        swal({
            title: "Are you sure?",
            text: "Do you want to change the payment status!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4CAF50",
            confirmButtonText: "Yes, change it!",
            cancelButtonText: "No, cancel pls!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                Od_Update_Payment();
                swal("Changed!", "Payment status has been changed.", "success");
            } else {
                swal("Cancelled", "Payment status not changed. :)", "error");
            }
        });
    });
    $('#btnSaveRefundStatus').click(function () {
        if ($('#txt_payment_date').val() == "" || $('#txt_payment_date').val() == null) {
            $('#Error_Msg_Refund').html("Invalid Refund Date");
            return false;
        }
        swal({
            title: "Are you sure?",
            text: "Do you want to change the payment status into refunded !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4CAF50",
            confirmButtonText: "Yes, change it!",
            cancelButtonText: "No, cancel pls!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                Od_Update_Payment();
                swal("Changed!", "Refunded status has been changed.", "success");
            } else {
                swal("Cancelled", "Refunded status not changed. :)", "error");
            }
        });
    });
    //Parameter
    $('#sa-params').click(function(){
        swal({   
            title: "Are you sure?",   
            text: "You will not be able to recover this imaginary file!",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            cancelButtonText: "No, cancel plx!",   
            closeOnConfirm: false,   
            closeOnCancel: false 
        }, function(isConfirm){   
            if (isConfirm) {     
                swal("Deleted!", "Your imaginary file has been deleted.", "success");   
            } else {     
                swal("Cancelled", "Your imaginary file is safe :)", "error");   
            } 
        });
    });

    //Custom Image
    $('#sa-image').click(function(){
        swal({   
            title: "Govinda!",   
            text: "Recently joined twitter",   
            imageUrl: "../plugins/images/users/govinda.jpg" 
        });
    });

    //Auto Close Timer
    $('#sa-close').click(function(){
         swal({   
            title: "Auto close alert!",   
            text: "I will close in 2 seconds.",   
            timer: 2000,   
            showConfirmButton: false 
        });
    });


    },
    //init
    $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
}(window.jQuery),

//initializing 
function($) {
    "use strict";
    $.SweetAlert.init()
}(window.jQuery);