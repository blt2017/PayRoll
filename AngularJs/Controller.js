//<reference path="../Scripts/angular.js"/>

///////////// BRANCH ///////////////////////
app.controller('branchController', function ($scope, payrollService) {
    $scope.Status = [
        {
            "Text": "Active",
            "Value": "1"
        },
        {
            "Text": "In Active",
            "Value": "2"
        }
    ]
    $scope.options = [
        {
            count: "5", id: 5
        },
        {
            count: "10", id: 10
        },
        {
            count: "20", id: 20
        },
        {
            count: "50", id: 50
        },
    ];
    $scope.drpCount = "5";
    var sort = "";
    GetAllBranch(1, 5, "","");
    clear();

    function GetAllBranch(pageno, pagesize, search, sort) {
        var getData = payrollService.getService("/Master/getBranch", pageno, pagesize, search, sort);
        getData.then(function (branch) {
            $scope.branchDet = branch.data[0];
            $scope.Row_count = branch.data[1].RowCnt;
            $scope.Start_Num = branch.data[1].Start_Num;
            $scope.End_Num = branch.data[1].End_Num;
            $scope.tot_count = branch.data[1].TotCnt;
            $scope.LastPage = branch.data[1].LastPage;
            $scope.pageno = pageno;
        }, function (error, status) {
            //alert(JSON.stringify(error));
            alert('Error in Getting Record');
        });
    }

    $scope.getBranch = function (movingType, sort) {
        $scope.codeClass = [];
        $scope.nameClass = [];
        $scope.codeClass.slice(1, 1);
        $scope.nameClass.slice(1, 1);
        $scope.codeClass.push("fa fa-sort pull-right")
        $scope.nameClass.push("fa fa-sort pull-right")

        if ($scope.pageno <= 1 && movingType == "Previous")
            return false;
        if ($scope.pageno >= $scope.LastPage && (movingType == 'Next' || movingType == 'Last'))
            return false;

        if (movingType == 'Next')
            $scope.pageno += 1;
        else if (movingType == 'Previous')
            $scope.pageno -= 1;
        else if (movingType == 'First')
            $scope.pageno = 1;
        else if (movingType == 'Last')
            $scope.pageno = $scope.LastPage;

        if (sort == 'Code') {
            sort = $scope.codeAsc;
            sort == "codeAsc" ? $scope.codeAsc = "codeDesc" : $scope.codeAsc = "codeAsc";
            sort == "codeAsc" ? $scope.codeClass.push("fa fa-sort-desc pull-right") : $scope.codeClass.push("fa fa-sort-asc pull-right");
        }
        if (sort == 'Name') {
            sort = $scope.nameAsc;
            sort == "nameAsc" ? $scope.nameAsc = "nameDesc" : $scope.nameAsc = "nameAsc";
            sort == "nameAsc" ? $scope.nameClass.push("fa fa-sort-desc pull-right") : $scope.nameClass.push("fa fa-sort-asc pull-right")
        }
        if (sort == '')
            sort = '';

        GetAllBranch($scope.pageno, $scope.drpCount, $scope.txtsearch, sort);
    }

    $scope.getBranchPopup = function () {
        clear();
        $("#modal_visible").click();
    }

    $scope.branchAction = function () {
        var getData = payrollService.createService("/Master/AddUpdateBranch",$scope.branch);
        getData.then(function (msg) {
            GetAllBranch(1, 5, "");
            clear();
            $(".close").click();
            $("#btn_add_success").click();
        }, function () {
            //$scope.data.error = { message: error, status: status };
            //alert($scope.data.error.status);
            alert('Error in updating record');
        });
    }
    
    $scope.editBranch = function (branch) {
        var getData = payrollService.getServiceByID("/Master/getBranchById", branch.id);
        getData.then(function (branchDet) {
            $("#modal_visible").click();
            var det = branchDet.data[0];
            $scope.branch = {
                id: det.id,
                Branch_Code: det.Branch_Code,
                Branch_Name: det.Branch_Name,
                Status: det.Status
            }
        }, function () {
            //$scope.data.error = { message: error, status: status };
            //alert($scope.data.error.status);
            alert('Error in Saving Record');
        });
    }

    function clear() {
        $scope.branch = {
            id: null,
            Branch_Code: null,
            Branch_Name: null,
            Status: "1"
        };
    }
});

///////////// DESINGNATION ///////////////////////
app.controller('designationController', function ($scope, payrollService) {
    $scope.Status = [
        {
            "Text": "Active",
            "Value": "1"
        },
        {
            "Text": "In Active",
            "Value": "2"
        }
    ]
    $scope.options = [
        {
            count: "5", id: 5
        },
        {
            count: "10", id: 10
        },
        {
            count: "20", id: 20
        },
        {
            count: "50", id: 50
        },
    ];
    $scope.drpCount = "5";
    var sort = "";

    GetAllDesignation(1, 5, "", "");
    clear();

    function GetAllDesignation(pageno, pagesize, search, sort) {
        var getData = payrollService.getService("/Master/getDesignation", pageno, pagesize, search, sort);
        getData.then(function (design) {
            $scope.designationDet = design.data[0];
            $scope.Row_count = design.data[1].RowCnt;
            $scope.Start_Num = design.data[1].Start_Num;
            $scope.End_Num = design.data[1].End_Num;
            $scope.tot_count = design.data[1].TotCnt;
            $scope.LastPage = design.data[1].LastPage;
            $scope.pageno = pageno;
        }, function (error, status) {
            //alert(JSON.stringify(error));
            alert('Error in Getting Record');
        });
    }

    $scope.getDesignation = function (movingType, sort) {
        $scope.designationClass = [];
        $scope.designationClass.slice(1, 1);
        $scope.designationClass.push("fa fa-sort pull-right")

        if ($scope.pageno <= 1 && movingType == "Previous")
            return false;
        if ($scope.pageno >= $scope.LastPage && (movingType == 'Next' || movingType == 'Last'))
            return false;

        if (movingType == 'Next')
            $scope.pageno += 1;
        else if (movingType == 'Previous')
            $scope.pageno -= 1;
        else if (movingType == 'First')
            $scope.pageno = 1;
        else if (movingType == 'Last')
            $scope.pageno = $scope.LastPage;

        if (sort == 'Name') {
            sort = $scope.designationAsc;
            sort == "designationAsc" ? $scope.designationAsc = "designationDesc" : $scope.designationAsc = "designationAsc";
            sort == "designationAsc" ? $scope.designationClass.push("fa fa-sort-desc pull-right") : $scope.designationClass.push("fa fa-sort-asc pull-right")
        }
        if (sort == '')
            sort = '';

        GetAllDesignation($scope.pageno, $scope.drpCount, $scope.txtsearch, sort);
    }

    $scope.getDesignationPopup = function () {
        clear();
        $("#modal_visible").click();
    }

    $scope.designationAction = function () {
        var getData = payrollService.createService("/Master/AddUpdateDesignation", $scope.designation);
        getData.then(function (msg) {
            GetAllDesignation(1, 5, "");
            clear();
            $(".close").click();
            $("#btn_add_success").click();
        }, function () {
            //$scope.data.error = { message: error, status: status };
            //alert($scope.data.error.status);
            alert('Error in updating record');
        });
    }

    $scope.editDesignation = function (designation) {
        var getData = payrollService.getServiceByID("/Master/getDesignationById", designation.id);
        getData.then(function (designationDet) {
            $("#modal_visible").click();
            var det = designationDet.data[0];
            $scope.designation = {
                id: det.id,
                Designation: det.Designation,
                Status: det.Status
            }
        }, function () {
            //$scope.data.error = { message: error, status: status };
            //alert($scope.data.error.status);
            alert('Error in Saving Record');
        });
    }

    function clear() {
        $scope.designation = {
            id: null,
            Designation: null,
            Status: "1"
        };
    }
});

///////////// SALARY HEAD ///////////////////////
app.controller('salayHeadController', function ($scope, payrollService) {
    $scope.Status = [
        {
            "Text": "Active",
            "Value": "1"
        },
        {
            "Text": "In Active",
            "Value": "2"
        }
    ]
    $scope.options = [
        {
            count: "5", id: 5
        },
        {
            count: "10", id: 10
        },
        {
            count: "20", id: 20
        },
        {
            count: "50", id: 50
        },
    ];
    $scope.drpCount = "5";
    var sort = "";

    GetAllSalaryHead(1, 5, "", "");
    clear();

    function GetAllSalaryHead(pageno, pagesize, search, sort) {
        var getData = payrollService.getService("/Master/getSalaryHead", pageno, pagesize, search, sort);
        getData.then(function (salary) {
            $scope.salaryHeadDet = salary.data[0];
            $scope.Row_count = salary.data[1].RowCnt;
            $scope.Start_Num = salary.data[1].Start_Num;
            $scope.End_Num = salary.data[1].End_Num;
            $scope.tot_count = salary.data[1].TotCnt;
            $scope.LastPage = salary.data[1].LastPage;
            $scope.pageno = pageno;
        }, function (error, status) {
            alert('Error in Getting Record');
        });
    }

    $scope.getSalaryHead = function (movingType, sort) {
        $scope.salaryHeadClass = [];
        $scope.salaryHeadClass.slice(1, 1);
        $scope.salaryHeadClass.push("fa fa-sort pull-right")

        if ($scope.pageno <= 1 && movingType == "Previous")
            return false;
        if ($scope.pageno >= $scope.LastPage && (movingType == 'Next' || movingType == 'Last'))
            return false;

        if (movingType == 'Next')
            $scope.pageno += 1;
        else if (movingType == 'Previous')
            $scope.pageno -= 1;
        else if (movingType == 'First')
            $scope.pageno = 1;
        else if (movingType == 'Last')
            $scope.pageno = $scope.LastPage;

        if (sort == 'Name') {
            sort = $scope.salaryHeadAsc;
            sort == "salaryHeadAsc" ? $scope.salaryHeadAsc = "salaryHeadDesc" : $scope.salaryHeadAsc = "salaryHeadAsc";
            sort == "salaryHeadAsc" ? $scope.salaryHeadClass.push("fa fa-sort-desc pull-right") : $scope.salaryHeadClass.push("fa fa-sort-asc pull-right")
        }
        if (sort == '')
            sort = '';

        GetAllSalaryHead($scope.pageno, $scope.drpCount, $scope.txtsearch, sort);
    }

    $scope.getsalaryHeadPopup = function () {
        clear();
        $("#modal_visible").click();
    }

    $scope.salaryHeadAction = function () {
        var getData = payrollService.createService("/Master/AddUpdateSalaryHead", $scope.salaryHead);
        getData.then(function (msg) {
            GetAllSalaryHead(1, 5, "");
            clear();
            $(".close").click();
            $("#btn_add_success").click();
        }, function () {
            alert('Error in updating record');
        });
    }

    $scope.editSalaryHead = function (salaryHead) {
        var getData = payrollService.getServiceByID("/Master/getSalaryHeadById", salaryHead.id);
        getData.then(function (salaryHeadDet) {
            $("#modal_visible").click();
            var det = salaryHeadDet.data[0];
            $scope.salaryHead = {
                id: det.id,
                SalaryHead: det.SalaryHead,
                Status: det.Status
            }
        }, function () {
            alert('Error in Saving Record');
        });
    }

    function clear() {
        $scope.salaryHead = {
            id: null,
            SalaryHead: null,
            Status: "1"
        };
    }
});

///////////// SALARY DEDUCTION ///////////////////////
app.controller('salayDeductionController', function ($scope, payrollService) {
    $scope.Status = [
        {
            "Text": "Active",
            "Value": "1"
        },
        {
            "Text": "In Active",
            "Value": "2"
        }
    ]
    $scope.options = [
        {
            count: "5", id: 5
        },
        {
            count: "10", id: 10
        },
        {
            count: "20", id: 20
        },
        {
            count: "50", id: 50
        },
    ];
    $scope.drpCount = "5";
    var sort = "";

    GetAllSalaryDeduction(1, 5, "", "");
    clear();

    function GetAllSalaryDeduction(pageno, pagesize, search, sort) {
        var getData = payrollService.getService("/Master/getSalaryDeduction", pageno, pagesize, search, sort);
        getData.then(function (salary) {
            $scope.salaryDeductionDet = salary.data[0];
            $scope.Row_count = salary.data[1].RowCnt;
            $scope.Start_Num = salary.data[1].Start_Num;
            $scope.End_Num = salary.data[1].End_Num;
            $scope.tot_count = salary.data[1].TotCnt;
            $scope.LastPage = salary.data[1].LastPage;
            $scope.pageno = pageno;
        }, function (error, status) {
            alert('Error in Getting Record');
        });
    }

    $scope.getSalaryDeduction = function (movingType, sort) {
        $scope.salaryDeductionClass = [];
        $scope.salaryDeductionClass.slice(1, 1);
        $scope.salaryDeductionClass.push("fa fa-sort pull-right")

        if ($scope.pageno <= 1 && movingType == "Previous")
            return false;
        if ($scope.pageno >= $scope.LastPage && (movingType == 'Next' || movingType == 'Last'))
            return false;

        if (movingType == 'Next')
            $scope.pageno += 1;
        else if (movingType == 'Previous')
            $scope.pageno -= 1;
        else if (movingType == 'First')
            $scope.pageno = 1;
        else if (movingType == 'Last')
            $scope.pageno = $scope.LastPage;

        if (sort == 'Name') {
            sort = $scope.salaryDeductionAsc;
            sort == "salaryDeductionAsc" ? $scope.salaryDeductionAsc = "salaryDeductionDesc" : $scope.salaryDeductionAsc = "salaryDeductionAsc";
            sort == "salaryDeductionAsc" ? $scope.salaryDeductionClass.push("fa fa-sort-desc pull-right") : $scope.salaryDeductionClass.push("fa fa-sort-asc pull-right")
        }
        if (sort == '')
            sort = '';

        GetAllSalaryDeduction($scope.pageno, $scope.drpCount, $scope.txtsearch, sort);
    }

    $scope.getsalaryDeductionPopup = function () {
        clear();
        $("#modal_visible").click();
    }

    $scope.salaryDeductionAction = function () {
        var getData = payrollService.createService("/Master/AddUpdateSalaryDeduction", $scope.salaryDeduction);
        getData.then(function (msg) {
            GetAllSalaryDeduction(1, 5, "");
            clear();
            $(".close").click();
            $("#btn_add_success").click();
        }, function () {
            alert('Error in updating record');
        });
    }

    $scope.editSalaryDeduction = function (salaryDeduction) {
        var getData = payrollService.getServiceByID("/Master/getSalaryDeductionById", salaryDeduction.id);
        getData.then(function (salaryDeductionDet) {
            $("#modal_visible").click();
            var det = salaryDeductionDet.data[0];
            $scope.salaryDeduction = {
                id: det.id,
                DeductionType: det.DeductionType,
                Status: det.Status
            }
        }, function () {
            alert('Error in Saving Record');
        });
    }

    function clear() {
        $scope.salaryDeduction = {
            id: null,
            DeductionType: null,
            Status: "1"
        };
    }
});


/////////////////////employee///////////////////////
app.controller('employeeController', function ($scope, payrollService) {
	$scope.Status = [
		{
			"Text": "Active",
			"Value": "1"
		},
		{
			"Text": "In Active",
			"Value": "2"
		}
	]
	$scope.options = [
		{
			count: "5", id: 5
		},
		{
			count: "10", id: 10
		},
		{
			count: "20", id: 20
		},
		{
			count: "50", id: 50
		},
	];

	$scope.Genders = [
		{
			"Text": "Male",
			"Value": "1"
		},
		{
			"Text": "Female",
			"Value": "2"
		}
	]

	$scope.drpCount = "5";
	var sort = "";
	GetAllEmployees(1, 5, "", "");


	$scope.sameaddress = function (employee) {
		if ($scope.sameAddress) {
			$scope.employee.Permanent_Address1 = angular.copy($scope.employee.Present_Address1);
			$scope.employee.Permanent_Address2 = angular.copy($scope.employee.Present_Address2);
			$scope.employee.Permanent_City = angular.copy($scope.employee.Present_City);
			$scope.employee.Permanent_State = angular.copy($scope.employee.Present_State);
			$scope.employee.Permanent_Pincode = angular.copy($scope.employee.Present_Pincode);
		}
		else {
			$scope.employee.Permanent_Address1 = "";
			$scope.employee.Permanent_Address2 = "";
			$scope.employee.Permanent_City = "";
			$scope.employee.Permanent_State = "";
			$scope.employee.Permanent_Pincode = "";
		}
	};
	function GetAllEmployees(pageno, pagesize, search, sort) {
		var getData = payrollService.getService("/Master/getEmployees", pageno, pagesize, search, sort);
		getData.then(function (employee) {
			$scope.employeeDetail = employee.data[0];
			$scope.Row_count = employee.data[1].RowCnt;
			$scope.Start_Num = employee.data[1].Start_Num;
			$scope.End_Num = employee.data[1].End_Num;
			$scope.tot_count = employee.data[1].TotCnt;
			$scope.LastPage = employee.data[1].LastPage;
			$scope.pageno = pageno;
		}, function (error, status) {
			//alert(JSON.stringify(error));
			alert('Error in Getting Record');
		});
	}

	$scope.getEmployee = function (movingType, sort) {
		$scope.codeClass = [];
		$scope.nameClass = [];
		$scope.codeClass.slice(1, 1);
		$scope.nameClass.slice(1, 1);
		$scope.codeClass.push("fa fa-sort pull-right")
		$scope.nameClass.push("fa fa-sort pull-right")

		if ($scope.pageno <= 1 && movingType == "Previous")
			return false;
		if ($scope.pageno >= $scope.LastPage && (movingType == 'Next' || movingType == 'Last'))
			return false;

		if (movingType == 'Next')
			$scope.pageno += 1;
		else if (movingType == 'Previous')
			$scope.pageno -= 1;
		else if (movingType == 'First')
			$scope.pageno = 1;
		else if (movingType == 'Last')
			$scope.pageno = $scope.LastPage;

		if (sort == 'Code') {
			sort = $scope.codeAsc;
			sort == "codeAsc" ? $scope.codeAsc = "codeDesc" : $scope.codeAsc = "codeAsc";
			sort == "codeAsc" ? $scope.codeClass.push("fa fa-sort-desc pull-right") : $scope.codeClass.push("fa fa-sort-asc pull-right");
		}
		if (sort == 'Name') {
			sort = $scope.nameAsc;
			sort == "nameAsc" ? $scope.nameAsc = "nameDesc" : $scope.nameAsc = "nameAsc";
			sort == "nameAsc" ? $scope.nameClass.push("fa fa-sort-desc pull-right") : $scope.nameClass.push("fa fa-sort-asc pull-right")
		}
		if (sort == '')
			sort = '';

		GetAllEmployees($scope.pageno, $scope.drpCount, $scope.txtsearch, sort);
	}


	$scope.editEmployee = function (employee) {
		window.location = '/Master/Employees_Action?id=' + employee.id;
	}

	var empid = getUrlParameter('id');
	if (empid != undefined) {
		getdesination_list();
		getEmployeeById(empid);
	}

	function getdesination_list() {
		var getData = payrollService.getServiceDropdown("/Master/getdropdowns");
		getData.then(function (data) {
			$scope.desinations = data.data[0];
			$scope.Branchs = data.data[1];
		}, function (error, status) {
			//alert(JSON.stringify(error));
			alert('Error in Getting Record');
		});
	}


	$scope.EmployeeAction = function () {
		alert(JSON.stringify($scope.file));
		var getData = payrollService.createService_image("/Master/AddUpdateEmployee", $scope.employee, $scope.file);
		getData.then(function (msg) {
			window.location = '/Master/Employees_List';
		}, function () {
			//$scope.data.error = { message: error, status: status };
			//alert($scope.data.error.status);
			alert('Error in updating record');
		});
	}

	function getEmployeeById(empid) {
		var Employee_tbl = { id: empid };
		var getData = payrollService.createService("/Master/getEmployeeById", Employee_tbl);
		getData.then(function (employee) {
			$scope.employee = employee.data[0];
			//{
			//	id: emloyeedet.id,
			//	First_Name: emloyeedet.First_Name,
			//	Last_Name: emloyeedet.Last_Name,
			//	Status: emloyeedet.Status,
			//	Present_Address1: emloyeedet.Present_Address1,
			//	DOB: emloyeedet.DOB
			//}
		}, function (error, status) {
			alert(JSON.stringify(error));
			alert('Error in Getting Record');
		});
	}
});


function getUrlParameter(param, dummyPath) { var sPageURL = dummyPath || window.location.search.substring(1), sURLVariables = sPageURL.split(/[&||?]/), res; for (var i = 0; i < sURLVariables.length; i += 1) { var paramName = sURLVariables[i], sParameterName = (paramName || '').split('='); if (sParameterName[0] === param) { res = sParameterName[1]; } } return res; }