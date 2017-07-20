$('.service_ul').hide();
$(document).ready(function () {
    //Generate Proposal
    var qs = getUrlParameterByName('Proposal_ID');//getUrlVars()["Proposal_ID"];

    if (qs != undefined) {
        $('#CB_EmailDiv').show();
        $('#btn_Download').show();
        $('#btn_Order').show();
        $('#btnSubmit').html('Update');
        $('#ProposalEdit').hide();
		$('#ProposalSummary').slideDown();
    }

    

    $('#drp_Employer').change(function () {
        var Emp_Id = $(this).val();
		var Emp_Name = $('#drp_Employer option:selected').text();
		$('#ProposalEdit').slideDown();
		$('#ProposalSummary').slideUp();
        var edit = '/Maintenance/Employer_Select';
        $('#emp_name').html(Emp_Name);
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

    $('#btn_Download').click(function () {
        var url = '/Proposals/dowload_Proposal?Proposal_Id=' + qs;
        window.open(url, 'popup_window', 'width=700,height=500,left=300,top=100,resizable=yes');
    });

    $('#btn_Order').click(function () {
        if (qs != undefined) {
            window.location = '/Orders/OrderConfirm?ORD_Id=' + qs;
        }
    });

    //Proposal List
    //$('.download_proposal').click(function () {
    //    var pid = $(this).val();
    //    var url = '/Proposals/dowload_Proposal?Proposal_Id=' + pid;
    //    window.open(url, 'popup_window', 'width=700,height=500,left=300,top=100,resizable=yes');
    //});

    $('#drp_Employer').change(function () {
        $('#spn_err').text("");
        var Emp_Id = $(this).val();
        var Emp_Name = $('#drp_Employer option:selected').text();
        var edit = '/Maintenance/Employer_Select';
        $('#emp_name').html(Emp_Name);
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

});

//Generate Proposal
(function ($) {
    function Tree() {
        var $this = this;

        function treeNodeClick() {
            $(document).on('click', '.tree li a input[type="checkbox"]', function () {
                $(this).closest('li').find('ul input[type="checkbox"]').prop('checked', $(this).is(':checked'));
                get_ItemDetails();
            }).on('click', '.node-item', function () {
                var parentNode = $(this).parents('.tree ul');
                if ($(this).is(':checked')) {
                    parentNode.find('li a .parent').prop('checked', true);
                    get_ItemDetails();
                } else {
                    var elements = parentNode.find('ul input[type="checkbox"]:checked');
                    if (elements.length == 0) {
                        parentNode.find('li a .parent').prop('checked', false);
                    }
                    get_ItemDetails();
                }
            });
        };

        $this.init = function () {
            treeNodeClick();
            get_ItemDetails();
        }
    }
    $(function () {
        var self = new Tree();
        self.init();
    })
}(jQuery))

$(document).ready(function () {
    $('#drp_Employer').change(function () {
        if ($('#drp_Employer').val() == null || $('#drp_Employer').val() == "") {
            $('#Err_span').text("Please Select Employer");
            return false;
        }
        $('#loader').show();
        $('#drp_Pricing').val("");
        var emp_id = $('#drp_Employer').val();
        var pricing_id = null;
        get_pricingTier(emp_id, pricing_id);
    });
    $('#drp_Pricing').change(function () {
		$('#loader').show();
		$('#ProposalEdit').slideDown();
		$('#ProposalSummary').slideUp();
        var emp_id = $('#drp_Employer').val();
        var pricing_id = $('#drp_Pricing').val();
        $('#itemList').html("");
        get_pricingTier(emp_id, pricing_id);
    });
});

function get_pricingTier(emp_id, pricing_id) {
    $.ajax({
        type: "GET",
        url: "/Proposals/get_PricingTier",
        contentType: "application/json; charset=utf-8",
        data: { "Emp_Id": emp_id, "Pricing_Id": pricing_id },
        datatype: "json",
        success: function (data) {
            $('#div_Proposal_Generate').html(data);
            $('#loader').hide();
        },
        error: function (data) {
            alert("Loading Faild.");
        }
    });

}

function GetProposal() {
    var proposal_ID = getUrlParameterByName('Proposal_ID');//getUrlVars()["Proposal_ID"];
    var email_notify = "";
    if (proposal_ID != undefined) {
        if ($('#cb_EmailNotification').prop('checked') == true) {
            email_notify = "1";
        } else { email_notify = "0"; }
    } else {
        email_notify = "1";
    }
    if (Chk_Validation() != false) {
        $('#blockbtn5').click();
        var parentNode = $(this).parents('.tree ul');
        var i = 0;
        var ListService = [];
        var service = {};
        $('input.parent').each(function () {
            if ($(this).prop('checked') == true) {
                var catid = $('#hdn_Cate_Id_' + i).val();
                var j = 0;
                $(this).closest('ul').find('input.node-item').each(function () {
                    if ($(this).prop('checked') == true) {
                        var service_id = $('#hdn_service_Id_' + i + j).val();
                        var service_price = $('#hdn_service_price_' + i + j).val();
                        var final_price = $('#hdn_final_price_' + i + j).val();
                        
                        var service = {
                            Category_ID: catid,
                            Service_ID: service_id,
                            Service_Price: final_price,
                            Proposal_ID: proposal_ID,
                            email_alert: email_notify,
                            Pricing_ID: $('#drp_Pricing').val()
                        };
                        ListService.push(service);
                    }
                    j++;
                });
            }
            i++;
        });
        var generate_proposal = '/Proposals/Generate_Porposals';

        $.ajax({
            type: "POST",
            url: generate_proposal,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(ListService),
            datatype: "json",
            success: function (response) {
                if (response == "1") {
                    alert("Proposal Generate Successfully");
                    window.location = "/Proposals/Proposals_List";
                }
                else if (response == "2")
                    alert("Proposal Generate successfully..But Email send unsuccessfully..Error Occurred in Receiver Email..");
                else if (response == "0")
                    alert("Proposal Generate Unsuccessfully");

                $('#unblockbtn5').click();
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    }
}

function Chk_Validation() {
    var parentNode = $(this).parents('.tree ul');
    var i = 0;
    var j = 0;
    $('input.parent').each(function () {
        if ($(this).prop('checked') == true) {
            i = 1;
        }
    });
    var emp = $('#drp_Employer').val();
    var pricing_id = $('#drp_Pricing').val();
    if (emp == "") {
        j = 1;
        $('#Err_span').html("Please Select Employer");
        $('#drp_Employer').focus();
    }
    if (pricing_id == "") {
        j = 1;
        $('#Err_pricing').html("Please select Pricing Tier");
    }
    if (i != 1) {
        $('.Err_Chk').html("Please Select any one Product");
        j = 1;
    }
    if (j == 1)
        return false;
    else
        return true;
}

function get_ItemDetails() {
    var parentNode = $(this).parents('.tree ul');
    var i = 0;
    var strData = "";
    var total_amt = 0;
    var k = 0;
    $('input.parent').each(function () {
        $('.Err_Chk').html("");
        if ($(this).prop('checked') == true) {
            var cate = $('#span_Cate_' + i).text();
            var j = 0;
            k = 1;
            $(this).closest('ul').find('.service_li').slideDown();
            $(this).closest('ul').find('input.node-item').each(function () {
				if ($(this).prop('checked') == true) {
					var product = $('#span_product_' + i + j).text();
					var service_price = $('#hdn_service_price_' + i + j).val();
					var final_price = $('#hdn_final_price_' + i + j).val();
					var dicount_price = $('#hdn_discout_price_' + i + j).val();
					var dicount_type = $('#hdn_discout_type_' + i + j).val();

					strData += "<div id='itemDiv_" + i + "" + j + "' style='padding: 2px;background-color: #fff;margin: 1px;' class='col-md-12 b-b'>"

					var qs1 = getUrlParameterByName('Proposal_ID');
					if (qs1 != undefined) {
						strData += "<p style='cursor: pointer;margin: 6px 5px 4px 3px;' onclick='deleteItem(Chk_Child_" + i + "" + j + ",itemDiv_" + i + "" + j + ",Chk_Parent_" + i + ")' class='pull-right font-bold text-danger'><i class='ti-close hide'></i></p>"
					} else {
						strData += "<p style='cursor: pointer;margin: 6px 5px 4px 3px;' onclick='deleteItem(Chk_Child_" + i + "" + j + ",itemDiv_" + i + "" + j + ",Chk_Parent_" + i + ")' class='pull-right font-bold text-danger'><i class='ti-close hide'></i></p>"
					}
					strData += "<p  style='display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;margin: 6px 5px 4px 3px;' class='pull-left'>P - " + product + "</p>";
					if (dicount_type == "0") {
					    strData += "<p style='margin: 6px 5px 4px 3px;' class='pull-right font-bold'>$" + service_price + " - " + dicount_price + "% = $" + (parseFloat(service_price)-((parseFloat(dicount_price) / 100) * parseFloat(service_price)).toFixed(2)).toString() + "</p></div>";
					    total_amt += (parseFloat(service_price) - ((parseFloat(dicount_price) / 100) * parseFloat(service_price)).toFixed(2));
					} else {
					    strData += "<p style='margin: 6px 5px 4px 3px;' class='pull-right font-bold'>$" + service_price + " - $" + dicount_price + " = $" + (parseFloat(service_price) - parseFloat(dicount_price)).toString() + "</p></div>";
					    total_amt += (parseFloat(service_price) - parseFloat(dicount_price));
					}
					
				}
                j++;
            });
            $("#itemList").html(strData);
            $("#lbl_total").text(total_amt.toFixed(2));
        } else {
            $("#lbl_total").text(total_amt.toFixed(2));
            $(this).closest('ul').find('.service_li').slideUp();
        }
        i++;
    });
    if (k == 0) {
        strData = "<h4><p class='text-center text-danger'>No Product Selected</p></h4>";
        $("#itemList").html(strData);
    }

}

function deleteItem(chk_child_id, itemDiv_id, chk_parent_id) {
    $(chk_child_id).prop('checked', false);
    $(itemDiv_id).remove();
    var i = 0;

    var parentNode = $(this).parents('.tree ul');
    $(chk_parent_id).closest('ul').find('input.node-item').each(function () {
        if ($(this).prop('checked') == true) {
            i = 1;
        }
    });
    if (i == 0) {
        $(chk_parent_id).prop('checked', false);
    }
    get_ItemDetails();
}

//Proposal List
function Generate_Duplicate_Proposal() {
    if ($('#drp_Employer').val() != "") {
        $('#btnSubmit').hide();
        $('.loader').show();
        var proposal_id = $('#hdn_proposal_id').val();
        $.ajax({
            type: "GET",
            url: "/Proposals/Generate_Duplicate_Porposal",
            contentType: "application/json; charset=utf-8",
            data: { "proposal_id": proposal_id },
            datatype: "json",
            success: function (response) {
                $('#btnSubmit').show();
                $('.loader').hide();
                if (response == "1") {
                    alert("Proposal Generated Successfully..");
                    window.location = "/Proposals/Proposals_List";
                } else if (response == "0")
                    alert("Proposal Generate Unsuccessfully");
            },
            error: function (data) {
                alert("Loading Faild.");
            }
        });
    } else {
        $('#spn_err').text("Please Select the Employer");
    }
}

function show_proposal_details() {
    var proposal_id = $('#hdn_proposal_id').val();
    $.ajax({
        type: "GET",
        url: "/Proposals/show_proposal_details",
        contentType: "application/json; charset=utf-8",
        data: { "proposal_id": proposal_id },
        datatype: "json",
        success: function (data) {
            $('#hide_proposal_details').show();
            $('#show_proposal_details').hide();
            var str = "";
            var target = $('#Proposal_details');
            target.empty();
            for (var i = 0; i < data.length; i++) {
                var list = data[i];
                str += "<tr><td>" + list.Category_Name + "</td><td>" + list.Product_Name + "</td><td>" + list.Product_Price + "</td></tr>";
            }
            target.append(str);
            $('#detailsDiv').slideDown();
        },
        error: function (data) {
            alert("Loading Faild.");
        }
    });
}

function hide_proposal_details() {
    $('#hide_proposal_details').hide();
    $('#show_proposal_details').show();
    $('#detailsDiv').slideUp();
}