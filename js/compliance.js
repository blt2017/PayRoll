//copy emplyer billing address
function employer_address_copy() {
	var name = $("#txt_Emp_Contact").val();
	var add1 = $("#txt_Emp_Addr1").val();
	var add2 = $("#txt_Emp_Addr2").val();
	var city = $("#txt_Emp_City").val();
	var state = $("#drp_Emp_State").val();
	var zip = $("#txt_Emp_Zip").val();
	var phone = $("#txt_Emp_PriPhn").val();
	var email = $("#txt_Emp_ContactEmail").val();

	if ($("#chk_copy_employer_data").prop("checked") == true) {
		$("#txt_Emp_Billingname").val(name);
		$("#txt_Emp_BillingAddr1").val(add1);
		$("#txt_Emp_BillingAddr2").val(add2);
		$("#txt_Emp_BillingCity").val(city);
		$("#drp_Emp_BillingState").val(state);
		$("#txt_Emp_BillingZip").val(zip);
		$("#txt_Emp_BillingPhone").val(phone);
		$("#txt_Emp_BillingEmail").val(email);

	} else {
		$("#txt_Emp_Billingname").val("");
		$("#txt_Emp_Billingname").keypress(" ");
		$("#txt_Emp_BillingAddr1").val("");
		$("#txt_Emp_BillingAddr2").val("");
		$("#txt_Emp_BillingCity").val("");
		$("#drp_Emp_BillingState").val("");
		$("#txt_Emp_BillingZip").val("");
		$("#txt_Emp_BillingPhone").val("");
		$("#txt_Emp_BillingEmail").val("");
	}

}

//assistance list
function add_broker_assistent(broker_id) {
	var add_user_url = '/Master/add_user';
	var id = 0;
	if (chk_validation(broker_id) == true) {
		if (broker_id == null) {
			var Broker_User = {
				bu_fname: jQuery("#U_fname").val()
				, bu_lname: jQuery("#U_lname").val()
				, bu_phone: jQuery("#U_phone").val()
				, bu_Sphone: jQuery("#U_Sphone").val()
				, bu_email: jQuery("#U_email").val()
				, bu_pass: jQuery("#U_password").val()
				, bu_id: id = id + 1
			}
		}
		else {
			var Broker_User = {
				Broker_ID: broker_id
			}
		}
		$.ajax({
			type: "POST",
			url: add_user_url,
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(Broker_User),
			datatype: "json",
			success: function (data) {
				$("#tbl_User").show();
				var str = '';
				var target = $('.User_det');
				target.empty();
				for (var i = 0; i < data.length; i++) {
					var Buser = data[i];
					str += "<tr><td>" + Buser.bu_fname + "</td>"
						+ "<td>" + Buser.bu_lname + "</td>"
						+ "<td>" + Buser.bu_phone + "</td>"
						+ "<td>" + Buser.bu_Sphone + "</td>"
						+ "<td>" + Buser.bu_email + "</td></td>"
						+ "<td>" + Buser.bu_pass + "</td></td>"
						+ "<td><a foo=" + Buser.bu_id + " onclick=delete_user(" + Buser.bu_id + ") class='btn btn-success waves-effect waves-light m-r-10'><b><i class='icon-trash text-white'></i></b></a></td></tr>"
				}
				target.append(str);
				$("#U_fname").val("");
				$("#U_lname").val("");
				$("#U_phone").val("");
				$("#U_Sphone").val("");
				$("#U_email").val("");
				$("#U_password").val("");
				$("#U_Cpassword").val("");

			},
			error: function (data) {
				alert("Loading Faild.");
			}
		});
	}
}

$(document).ready(function () {
	$("#add_user").click(function () {
		var broker_id = null;
		add_broker_assistent(broker_id);
	});
});

$(document).ready(function () {
	var broker_id = getUrlParameterByName('Broker_ID');//getUrlVars()["Broker_ID"];
	add_broker_assistent(broker_id);
});

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

function getUrlParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function delete_user(id) {
	var delete_user_url = '/Master/delete_user';
	var Broker_User = {
		bu_id: id
	}
	$.ajax({
		type: "POST",
		url: delete_user_url,
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(Broker_User),
		datatype: "json",
		success: function (data) {
			$("#tbl_User").show();
			var str = '';
			var target = $('.User_det');
			target.empty();
			for (var i = 0; i < data.length; i++) {
				var Buser = data[i];
				str += "<tr><td>" + Buser.bu_fname + "</td>"
					+ "<td>" + Buser.bu_lname + "</td>"
					+ "<td>" + Buser.bu_phone + "</td>"
					+ "<td>" + Buser.bu_Sphone + "</td>"
					+ "<td>" + Buser.bu_email + "</td></td>"
					+ "<td>" + Buser.bu_pass + "</td></td>"
					+ "<td><a foo=" + Buser.bu_id + " onclick=delete_user(" + Buser.bu_id + ") class='btn btn-success waves-effect  waves-light m-r-10'><b><i class='icon-trash text-white'></i></b></a></td></tr>"
			}
			target.append(str);
			if (data.length < 1) {
				$("#tbl_User").hide();
			}
		},
		error: function (data) {
			alert("Loading Faild.");
		}
	});
}

//Email validation
function checkEmail() {
	var email = $('#U_email').val();
	var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var chkemail = expr.test(email);
	if (!chkemail) {
		return false
	} else {
		return true;
	}
}

//Email validation General
function Email_Validation(id) {
	var email = $('#' + id).val();
	var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var chkemail = expr.test(email);
	if (!chkemail) {
		return false
	} else {
		return true;
	}
}

//Assistance validation
function chk_validation(broker_id) {
	if (broker_id != null)
		return true;
	var fname = $("#U_fname").val();
	var lname = $("#U_lname").val();
	var phone = $("#U_phone").val();
	var Sphone = $("#U_Sphone").val();
	var email = $("#U_email").val();
	var password = $("#U_password").val();
	var cpass = $("#U_Cpassword").val();
	if (fname == "" || lname == "" || phone == "" || email == "" || password == "") {
		if (fname == "") {
			$('#val_U_fname').html("First name is required");
		}
		else {
			$('#val_U_fname').html("");
		}
		if (lname == "") {
			$('#val_U_lname').html("Last name is required");
		}
		else {
			$('#val_U_lname').html("");
		}
		if (phone == "") {
			$('#val_U_phone').html("Phone number is required");
		}
		else {
			$('#val_U_phone').html("");
		}
		if (email == "") {
			$('#val_U_email').html("Email is required");
		}
		else {
			$('#val_U_email').html("");
		}
		if (password == "") {
			$('#val_U_password').html("Password is required");
		}
		else {
			$('#val_U_password').html("");
		}
		if (cpass == "") {
			$('#val_U_Cpassword').html("Confirm Password is required");
		}
		else {
			$('#val_U_Cpassword').html("");
		}
		return false;
	}


	if (email != "" || password != "" || cpass != "") {
		if (checkEmail() == false) {
			$('#val_U_email').html("Email is not valid");
			return false;
		}
		if (cpass != password) {
			$('#val_U_Cpassword').html("Password is Mismatch");
			return false;
		}
		else {
			$('#val_U_email').html("");
			$('#val_U_Cpassword').html("");
			return true;
		}

	}
	else {
		$('#val_U_fname').html("");
		$('#val_U_lname').html("");
		$('#val_U_phone').html("");
		$('#val_U_email').html("");
		$('#val_U_password').html("");
		$('#val_U_Cpassword').html("");
		return true;
	}
}

//check user name unique or not
function check_username_validation(email) {
	var agency_add_Url = '/Master/Broker_Username_Validation';
	$("#chk_user").html("Loading...");
	//var email = $("#txt_Broker_Username").val();
	$.ajax({
		type: "GET",
		url: agency_add_Url,
		contentType: "application/json; charset=utf-8",
		data: { "email": email },
		datatype: "json",
		success: function (response) {
			if (response > 0) {
				$("#txt_Username").val("");
				$("#chk_user").html(email + " already exist");
			}
			else
				$("#chk_user").html("");
		},
		error: function (data) {
			alert("Loading Faild.");
		}

	});
}

//Pagination
$(document).ready(function () {
	$('#txtsearch').keyup(function () {
		if (CalculateAndSetPage('First'))
			$('form').submit();
	});
	$('#drp_count').change(function () {
		if (CalculateAndSetPage('First'))
			$('form').submit();
	});
	$('#First').click(function () {
		if (CalculateAndSetPage('First'))
			$('form').submit();
	});
	$('#Previous').click(function () {
		if (CalculateAndSetPage('Previous'))
			$('form').submit();
	});
	$('#Next').click(function () {
		if (CalculateAndSetPage('Next'))
			$('form').submit();
	});
	$('#Last').click(function () {
		if (CalculateAndSetPage('Last'))
			$('form').submit();
	});
	$('#drp_Emp').change(function () {
		var Emp_Name = $('#drp_Emp option:selected').text();
		var Emp_Id = $('#drp_Emp').val();
		if (Emp_Id != "") {
			$('#lbl_of').html("of ")
			$('#emp_name').html(Emp_Name);
		}
		else {
			$('#emp_name').html("");
			$('#lbl_of').html("")
		}
		var Url = '/Maintenance/Employer_Select';
		$.ajax({
			type: "Get",
			url: Url,
			contentType: "application/json; charset=utf-8",
			data: { "Emp_Id": Emp_Id, "Emp_Name": Emp_Name },
			datatype: "json",
			success: function (response) {
				if (response == "1") {
					if (CalculateAndSetPage('First'))
						$('form').submit();
				}
			},
			error: function (data) {
				alert("Loading Faild.");
			}
		});
	});
	$('#drp_Bro').change(function () {
		var Bro_Name = $('#drp_Bro option:selected').text();
		var Bro_ID = $('#drp_Bro').val();
		if (Bro_ID != "") {
			$('#lbl_of').html("of ")
			$('#Bro_name').html(Bro_Name);
		}
		else {
			$('#Bro_name').html("");
			$('#lbl_of').html("")
		}
		var Url = '/Maintenance/Broker_Select';
		$.ajax({
			type: "Get",
			url: Url,
			contentType: "application/json; charset=utf-8",
			data: { "Bro_ID": Bro_ID, "Bro_Name": Bro_Name },
			datatype: "json",
			success: function (response) {
				if (response == "1") {
					if (CalculateAndSetPage('First'))
						$('form').submit();
				}
			},
			error: function (data) {
				alert("Loading Faild.");
			}
		});
	});

	$('#drp_agency').change(function () {
		var agency_Name = $('#drp_agency option:selected').text();
		var Agency_ID = $('#drp_agency').val();

		if (Agency_ID != "") {
			$('#lbl_of').html("of ")
			$('#agency_name').html(agency_Name);
		}
		else {
			$('#agency_name').html("");
			$('#lbl_of').html("")
		}
		var Url = '/Maintenance/Agency_Select';
		$.ajax({
			type: "Get",
			url: Url,
			contentType: "application/json; charset=utf-8",
			data: { "Agn_Id": Agency_ID, "Agn_Name": agency_Name },
			datatype: "json",
			success: function (response) {
				if (response == "1") {
					if (CalculateAndSetPage('First'))
						$('form').submit();
				}
			},
			error: function (data) {
				alert("Loading Faild.");
			}
		});
	});

	function CalculateAndSetPage(movingtype) {
		var count = parseInt($('#drp_count').val());
		var currentPage = parseInt($('#CurrentPage').val());
		var lastpage = parseInt($('#LastPage').val());
		var search = $('#txtsearch').val();
		var total_row = $('#hid_rowcount').val();
		var Emp_ID = $('#drp_Emp').val();
		var Bro_ID = $('#drp_Bro').val();
		var Agency_ID = $('#drp_agency').val();
		lastpage = total_row;

		if (currentPage <= 1 && movingtype == "Previous") {
			return false;
		}
		if (currentPage >= lastpage && (movingtype == 'Next' || movingtype == 'Last'))
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
		$("#Employer_Id").val(Emp_ID);
		$("#current_page").text(currentPage);
		$("#Broker_Id").val(Bro_ID);
		$("#Agency_ID").val(Agency_ID);
		return true;
	}
});

//Alert
$(document).ready(function () {
	var succ = $("#succ").val();
	if (succ != null) {
		if (succ == "add")
			$("#btn_add_success").click();
		if (succ == "update")
			$("#btn_update_success").click();
	}
});

//clear error message on form control keyup
function valEvent(id, span_id) {
	var valu = $("#" + id).val();
	if (valu != "") {
		$("#" + span_id).text("");
	}
}

//Login check
function chk_login() {

	var _login = {
		Username: $('#txt_Username').val(), Password: $('#txt_Password').val()
	}
	//$('#lb_status').hide();
	$('#btn_login').hide();
	$('.loader').show();
	$.ajax({
		type: "POST",
		url: "/Login/Credential",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(_login),
		dataType: "json",
		success: function (response) {
			if (response == "0") {
				$('#btn_login').show();
				$('.loader').hide();
				$('#txt_Password').val("");
				$('#lb_status').show();
				$('#btn_login').show();
				$('#log_load').hide();
				$("#lb_status").html("Invalid Access");

			} else if (response == "1") {
				window.location = "/Login/login_success";
			} else {
				window.location = response;
			}
		},
		error: function (data) {
			alert("login Faild.");
		}
	});
}

//Change Password
$(document).ready(function () {
	$("#Reset").click(function () {
		if (ValidatePassword() == false) {
			return false;
		}
		var _login = {
			User_id: getUrlParameterByName('Id'), User_type: getUrlParameterByName('type'), Password: $('#txtnew_Pass').val(), OldPass: $('#txtcurrent_Pass').val()
		}
		$('#Reset').hide();
		$('.loader').show();
		$.ajax({
			type: "POST",
			url: "/Login/ResetPassword",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(_login),
			dataType: "json",
			success: function (response) {
				$('#Reset').show();
				$('.loader').hide();
				if (response == "0") {
					$("#CurrentPass").html("Invalid Current Password!!!");
				} else if (response == "1") {
					$("#txtcurrent_Pass").val("");
					$("#txtnew_Pass").val("");
					$("#txtconfirm_Pass").val("");
					alert("Your Password Change Successfully...Please login again...")
					window.location = "/Login/login_success";
				} else {
					$("#CurrentPass").html("Invalid Current Password!!!");
				}
			},
			error: function (data) {
				alert("login Faild.");
			}
		});
	});
});

function ValidatePassword() {
	var currentpass = $("#txtcurrent_Pass").val();
	var newpass = $("#txtnew_Pass").val();
	var confirmpass = $("#txtconfirm_Pass").val();
	var i = 0;
	if (currentpass == "") {
		i = 1;
		$("#CurrentPass").text("Enter the Old Password");
	}
	if (newpass == "") {
		i = 1;
		$("#NewPass").text("Enter the New Password");
	}
	if (confirmpass != newpass) {
		i = 1;
		$("#ConfirmPass").text("Password Mismmatch...");
	}
	if (i == 0) {
		return true;
	}
	else {
		return false;
	}
}


//Registration toggle
function close_model() {
	$('#recoverform').slideUp();
	$('#loginform').slideDown();

}

//Export excel and PDF
$(document).ready(function () {
	$('#btn_Excel').click(function () {
		var type = $(this).val();
		var CurrentPage = $('#CurrentPage').val();
		var LastPage = $('#LastPage').val();
		var count = $('#Count').val();
		var Search = $('#Search').val();
		var sort = $('#sort').val();
		var filterId = $('.filterId').val();
		window.location = '/Reports/Export_Excel?CurrentPage=' + CurrentPage + '&count=' + count + '&Search=' + Search + '&sort=' + sort + '&type=' + type + '&filterId=' + filterId;
	});

	$('#btn_PDF').click(function () {
		var type = $(this).val();
		var CurrentPage = $('#CurrentPage').val();
		var LastPage = $('#LastPage').val();
		var count = $('#Count').val();
		var Search = $('#Search').val();
		var sort = $('#sort').val();
		var filterId = $('.filterId').val();
		window.open('/Reports/Export_PDF?CurrentPage=' + CurrentPage + '&count=' + count + '&Search=' + Search + '&sort=' + sort + '&type=' + type + '&filterId=' + filterId, 'popup_window', 'width=700,height=500,left=300,top=100,resizable=yes');
	});

	//Report
    $('.report').click(function () {
        
		var doctype = $(this).attr('doctype');
		var reporttype = $(this).attr('rprttype');
		var report_ID = $('#drp_rprt').val();
		var colList = $('#drp_clm').val();

		var i = 0;
		if (report_ID == null) {
			i = 1;
			$("#r_drp_error").text("Select Any One");
		}
		if (colList == null) {
			i = 1;
			$("#r_drpclm_error").text("Select Any Field");
		}
		if (i == 1) {
			return false;
		}
        else {
            $('#rprt_btn_group').hide();
            $('.loader').show();
			//$.cookie("rprt_ID", report_ID);
			$.cookie("doctype", doctype);
			$.cookie("rprt_type", reporttype);
            $.cookie("rprt_colList", colList);
            var broker = $('#drp_rprt').val() + "";

            var dt = broker.replace(/\,/g, '-');

            var Broker = {
                Broker_ID: dt
            }
            var success = false;
                $.ajax({
                    type: "POST",
                    url: '/Reports/Reports',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(Broker),
                    datatype: "json",
                    context: document.body,
                    async: false,
                    success: function (response) {
                        $('#rprt_btn_group').show();
                        $('.loader').hide();
                        if (response == "pdf") {
                            success = true
                            //window.location = '/Reports/download_Reports?doctype=' + response;
                        }
                            if (response == "excel")
                            window.location = '/Reports/download_Reports?doctype=' + response;
                        
                    },
                    error: function (xhr, status, error) {
                        alert(xhr.responseText);
                    }
            });
                if (success) { //AND THIS CHANGED
                    window.open('/Reports/download_Reports?doctype=pdf', 'popup_window', 'width=700,height=500,left=300,top=100,resizable=yes')
                }
		}
    });

    function myClickFunction() {
        alert("worked");
        window.open('/Reports/download_Reportsdoctype=pdf', 'popup_window', 'width=700,height=500,left=300,top=100,resizable=yes');
}
	$('#drp_rprt').multiselect({
		enableClickableOptGroups: true,
		buttonWidth: '100%',
		includeSelectAllOption: true,
		enableFiltering: true,
		enableCaseInsensitiveFiltering: true,
		maxHeight: 300,
		numberDisplayed: 1,
		onChange: function (option, checked, select) {
			valEvent(this.id, 'r_drp_error');
		}

	});


	$('#drp_clm').multiselect({
		buttonWidth: '100%',
		maxHeight: 300,
		numberDisplayed: 1,
		onChange: function (option, checked) {
			valEvent(this.id, 'r_drpclm_error');
			// Get selected options.
			//var selectedOptions = $('#drp_clm option:selected');

			//if (selectedOptions.length >= 6) {
			//    // Disable all other checkboxes.
			//    var nonSelectedOptions = $('#drp_clm option').filter(function () {
			//        return !$(this).is(':selected');
			//    });

			//    nonSelectedOptions.each(function () {
			//        var input = $('input[value="' + $(this).val() + '"]');
			//        input.prop('disabled', true);
			//        input.parent('li').addClass('disabled');
			//    });
			//    alert("You Reached Maximum selection");
			//}
			//else {
			//    // Enable all checkboxes.
			//    $('#drp_clm option').each(function () {
			//        var input = $('input[value="' + $(this).val() + '"]');
			//        input.prop('disabled', false);
			//        input.parent('li').addClass('disabled');
			//    });
			//}
		}
	});

    $('#frm_rprt').on('reset', function () {

		$('#drp_rprt option:selected').each(function () {
			$(this).prop('selected', false);
		})
		$('#drp_rprt').multiselect('refresh');

		$('#drp_clm option:selected').each(function () {
			$(this).prop('selected', false);
		})
        $('#drp_clm').multiselect('refresh');

        $('#rprt_start_date').val("");
        $('#rprt_end_date').val("");

		$('#showData').slideUp();
		$('#r_drp_error').text("");
        $('#count_record').text("");

       
        
	});
});

//Show table in report
$(document).ready(function () {

	$('#rprt_Search').click(function () {
		$('#showData').hide();
		var report_ID = $('#drp_rprt').val();
		var reporttype = $(this).attr('rprttype');
		var colList = $('#drp_clm').val();
		var i = 0;
		if (report_ID == null) {
			i = 1;
			$("#r_drp_error").text("Select Any One");
		}
		if (colList == null) {
			i = 1;
			$("#r_drpclm_error").text("Select Any Field");
		}
		if (i == 1) {
			return false;
		}
        else {
            $('#rprt_btn_group').hide();
            $('.loader').show();
            debugger;
			$.cookie("rprt_type", reporttype);
			//$.cookie("rprt_ID", report_ID);
            $.cookie("rprt_colList", colList);
            var broker = $('#drp_rprt').val() + "";
            
            var dt = broker.replace(/\,/g, '-');

            var Broker = {
                Broker_ID: dt
            }
          
            $.ajax({
                type: "POST",
                url: '/Reports/Get_Reports',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(Broker),
				datatype: "json",
				success: function (data) {
					var My_arr = $.parseJSON(data);
					CreateTableFromJSON(My_arr);
					$('#showData').slideDown();
					$('#rprt_btn_group').show();
					$('.loader').hide();

				},
				error: function (xhr, status, error) {
					alert(xhr.responseText);
				}
			});
		}

	});

	$('#PO_Search').click(function () {
		$('#showData').hide();
		var st_date = $('#rprt_start_date').val();
		var end_date = $('#rprt_end_date').val();
		var user_id = $('#drp_rprt').val();
		var colList = $('#drp_clm').val();
		var reporttype = $(this).attr('rprttype');
		if (reporttype != "Log" && reporttype != "Login" && colList == null) {
			$("#r_drpclm_error").text("Select Any Field");
		}
        else {
            $('#rprt_btn_group').hide();
            $('.loader').show();
			$.cookie("rprt_st_date", st_date);
			$.cookie("rprt_end_date", end_date);
			$.cookie("rprt_type", reporttype);
			//$.cookie("rprt_user_id", user_id);
			$.cookie("rprt_colList", colList);
            var broker = $('#drp_rprt').val() + "";

            var dt = broker.replace(/\,/g, '-');

            var Broker = {
                Broker_ID: dt
            }

			$.ajax({
				type: "POST",
				url: '/Reports/PO_Search',
				contentType: "application/json; charset=utf-8",
                data: JSON.stringify(Broker),
				datatype: "json",
				success: function (data) {
					
					
					var My_arr = $.parseJSON(data);
					CreateTableFromJSON(My_arr);
					$('#showData').slideDown();
					$('#rprt_btn_group').show();
					$('.loader').hide();
				},
				error: function (xhr, status, error) {
					alert(xhr.responseText);
				}
			});
		}
	});

	$('.PO_report').click(function () {
		var doctype = $(this).attr('doctype');
		var st_date = $('#rprt_start_date').val();
		var end_date = $('#rprt_end_date').val();
		var reporttype = $(this).attr('rprttype');
		var user_id = $('#drp_rprt').val();
		var colList = $('#drp_clm').val();

		if (reporttype != "Log" && reporttype != "Login" && colList == null) {
			$("#r_drpclm_error").text("Select Any Field");
		} else {
			$.cookie("rprt_st_date", st_date);
			$.cookie("rprt_end_date", end_date);
			$.cookie("doctype", doctype);
			$.cookie("rprt_type", reporttype);
			//$.cookie("rprt_user_id", user_id);
            $.cookie("rprt_colList", colList);
            var broker = $('#drp_rprt').val() + "";

            var dt = broker.replace(/\,/g, '-');

            var Broker = {
                Broker_ID: dt
            }
            $.ajax({
                type: "POST",
                url: '/Reports/PO_Reports',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(Broker),
                datatype: "json",
                async: false,
                success: function (response) {
                    $('#rprt_btn_group').show();
                    $('.loader').hide();
                    if (response == "pdf") {
                        window.location = '/Reports/download_Reports?doctype=' + response;
                    }
                    if (response == "excel")
                        window.location = '/Reports/download_Reports?doctype=' + response;

                },
                error: function (xhr, status, error) {
                    alert(xhr.responseText);
                }
            });
		//	if (doctype == "pdf")
		//		window.open('/Reports/PO_Reports', 'popup_window', 'width=700,height=500,left=300,top=100,resizable=yes');
		//	if (doctype == "excel")
		//		window.location = '/Reports/PO_Reports';
		}
	});

	//$('#rprt_PO_clear').click(function () {
	//	$('#rprt_start_date').val("");
	//	$('#rprt_end_date').val("");
	//	$('#showData').slideUp();
	//	$('#r_drp_error').text("");
	//	$('#count_record').text("");
	//});

	function CreateTableFromJSON(my_report) {
		// EXTRACT VALUE FOR HTML HEADER. 
		var rpt_count = my_report.length;
		var rpt_count_txt;
		var col = [];
		for (var i = 0; i < my_report.length; i++) {
			for (var key in my_report[i]) {
				if (col.indexOf(key) === -1) {
					col.push(key);
				}
			}
		}
		// CREATE DYNAMIC TABLE.
		var table = document.createElement("table");
		table.className = "table table-bordered";
		table.id = "myTable";
		// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
		var tr = table.insertRow(-1);
		// TABLE ROW.
		for (var i = 0; i < col.length; i++) {
			var th = document.createElement("th");      // TABLE HEADER.
			th.innerHTML = col[i];
			th.className = "text-info";
			tr.appendChild(th);
		}

		// ADD JSON DATA TO THE TABLE AS ROWS.
		for (var i = 0; i < my_report.length; i++) {
			tr = table.insertRow(-1);
			for (var j = 0; j < col.length; j++) {
				var tabCell = tr.insertCell(-1);
				tabCell.innerHTML = my_report[i][col[j]];
				if (j != 0)
					tabCell.dataset.th = col[j] + " :";
			}
		}
		// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
		var divContainer = document.getElementById("showData");
		divContainer.innerHTML = "";
		divContainer.appendChild(table);
		var divCount = document.getElementById("count_record");
		divCount.innerHTML = "";
		if (col[0] == "Report")
			rpt_count_txt = "";
		else
			if (rpt_count == 1)
				rpt_count_txt = rpt_count + " Record Found";
			else
				rpt_count_txt = rpt_count + " Records Found";
		divCount.innerHTML = rpt_count_txt;
	}
});

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31
		&& (charCode < 48 || charCode > 57))
		return false;

	return true;
}

//block UI loader
$(document).ready(function () {
	$('#blockbtn5').click(function () {
		$('body.block5').block({
			message: '<img src="../plugins/images/busy.gif" /><br/><h4 id="block_loader">Please Wait...</h4>'
			, css: {
				border: '1px solid #fff'
			}
		});
	});
	$('#unblockbtn5').click(function () {
		$('body.block5').unblock();
	});
});

//User Creation
(function ($) {
	function Tree() {
		var $this = this;

		function treeNodeClick() {
			$(document).on('click', '.tree1 li a input[type="checkbox"]', function () {
				$(this).closest('li').find('ul input[type="checkbox"]').prop('checked', $(this).is(':checked'));
			}).on('click', '.node-item', function () {
				var parentNode = $(this).parents('.tree1 ul');
				if ($(this).is(':checked')) {
					parentNode.find('li a .parent').prop('checked', true);
				} else {
					var elements = parentNode.find('ul input[type="checkbox"]:checked');
					if (elements.length == 0) {
						parentNode.find('li a .parent').prop('checked', false);
					}
				}
			});
		};

		$this.init = function () {
			treeNodeClick();
		}
	}
	$(function () {
		var self = new Tree();
		self.init();
	})
}(jQuery))

function GetMenu() {
	var RoleId = $("#drp_Role").val();
	var parentNode = $(this).parents('.tree1 ul');
	var i = 0;
	var User_Privilage = [];
	var mainmenu_id;
	var status;
	$('input.parent').each(function () {
		mainmenu_id = $('#hdn_MainPage_Id_' + i).val();
		if ($(this).prop('checked') == true) {
			status = 1;
			var MainMenu = {
				RoleID: RoleId,
				MainPage_ID: mainmenu_id,
				SubPage_ID: null,
				Status: status,
				Insert_Mode: 0
			};
			User_Privilage.push(MainMenu);
		}
		//else {
		//    status = 0;
		//}

		i++;
	});
	var user_url = '/Administrator/UserCreation_Action';

	$.ajax({
		type: "POST",
		url: user_url,
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(User_Privilage),
		datatype: "json",
		success: function (response) {
			if (response == "1") {
				var i = 0;
				$('input.parent').each(function () {
					mainmenu_id = $('#hdn_MainPage_Id_' + i).val();
					if ($(this).prop('checked') == true) {
						var j = 0;
						$(this).closest('ul').find('input.node-item').each(function () {
							var submenu_id = $('#hdn_SubPage_Id_' + i + j).val();
							if ($(this).prop('checked') == true) {
								status = 1;
								var SubMenu = {
									RoleID: RoleId,
									MainPage_ID: mainmenu_id,
									SubPage_ID: submenu_id,
									Status: status,
									Insert_Mode: 1
								};
								User_Privilage.push(SubMenu);
							}
							//else {
							//    status = 0;
							//}

							j++;
						});
					}
					i++;
				});
				$.ajax({
					type: "POST",
					url: user_url,
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(User_Privilage),
					datatype: "json",
					success: function (response) {
						if (response == "1") {
							alert("User Creation Successfully");
							window.location = "/Administrator/User_Role_List";
						}
						else
							alert("User Creation Unsuccessfully");

					},
					error: function (data) {
						alert("Loading Faild.");
					}
				});
			}
			else
				alert("Proposal Generate Unsuccessfully");

		},
		error: function (data) {
			alert("Loading Faild.");
		}
	});
}

// Assign Broker
$(document).ready(function () {
    $("#drp_staff").empty();
    $.getJSON("/Maintenance/Staff_List", function (data) {
        $('<option value="">').html('-- Select --').appendTo("#drp_staff");
        $.each(data, function (i, data) {      // bind the dropdown list using json result
            $('<option>',
               {
                   value: data.Value,
                   text: data.Text
               }).html(data.Text).appendTo("#drp_staff");
        });
    })

    $('#drp_staff').change(function () {
        $("#drp_broker").empty();
        if ($(this).val() != "") {
            $.ajax({
                type: "GET",
                url: "/Maintenance/BrokerList",
                contentType: "application/json; charset=utf-8",
                data: { "Staff_ID": $(this).val() },
                dataType: "json",
                success: function (data) {
                    $.each(data, function (i, data) {      // bind the dropdown list using json result
                        $("#drp_broker").append($("<option></option>")
                            .attr("value", data.Value)
                            .attr("selected", data.Selected)
                            .text(data.Text));
                        $('#drp_broker').multiSelect('refresh');
                    });
                },
                error: function (data) {
                    alert("Loading Faild.");
                }
            });
        } else {
            $('#drp_broker').multiSelect('refresh');
        }
    });

    $('#btn_Clear').click(function () {
        clear();
        return false;
    });

    $('#btn_save').click(function () {
        if (validate_BrokerManage() == true) {
            $.cookie("Broker_ID", $('#drp_broker').val());
            $.cookie("Staff_ID", $('#drp_staff').val());
            $.ajax({
                type: "GET",
                url: "/Maintenance/AssignBrokerAction",
                contentType: "application/json; charset=utf-8",
                data: {},
                dataType: "json",
                success: function (response) {
                    if (response == "1") {
                        clear();
                        brokerassignalert();
                        $.removeCookie("Broker_ID");
                        $.removeCookie("Staff_ID");
                    } else {
                        alert("Faild To Save.. Try Again..");
                    }
                },
                error: function (data) {
                    alert("Loading Faild.");
                }
            });
            return false;
        } else {
            return false;
        }
    });
});

function clear() {
    $('#drp_staff').val("");
    $("#drp_broker").empty();
    $('#drp_broker').multiSelect('refresh');
}

function validate_BrokerManage() {
    var staffid = $('#drp_staff').val();
    var brokerid = $('#drp_broker').val();
    var i = 0;

    if (staffid == "") {
        i = 1;
        $('#Err_Staff').text("Select Staff")
    }
    if (brokerid == null) {
        i = 1;
        $('#Err_Broker').text("Select Any One Broker")
    }
    if (i == 0)
        return true;
    else
        return false;
}