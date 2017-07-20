app.service("payrollService", function ($http) {

    this.createService = function (Url, data) {
        var response = $http({
            method: "POST",
            url: Url,
            data: JSON.stringify(data),
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        return response;
    }

    this.updateService = function (Url, data) {
        var response = $http({
            method: "PUT",
            url: Url,
            data: JSON.stringify(data),
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        return response;
    }

    this.getService = function (Url, PageIndex, PageSize, Search, Sort) {
        var response = $http({
            method: "GET",
            url: Url,
            params: { "PageIndex": PageIndex, "PageSize": PageSize, "Search": Search, "Sort": Sort },
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        return response;
    }

    this.getServiceByID = function (Url, ID) {
        var response = $http({
            method: "GET",
            url: Url,
            params: { "ID": ID} ,
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        return response;
    }

    this.DeleteService = function (Url, data) {
        var response = $http({
            method: "DELETE",
            url: Url,
            data: JSON.stringify(data),
            dataType: 'json',
            headers: { "Content-Type": "application/json" }
        });
        return response;
	}

	this.getServiceDropdown = function (Url) {
		var response = $http({
			method: "GET",
			url: Url,
			//params: { "ID": ID },
			dataType: 'json',
			headers: { "Content-Type": "application/json" }
		});
		return response;
	}

	this.createService_image = function (Url, data, file) {
		var response = $http({
			method: "POST",
			url: Url,
			data: JSON.stringify(data),
			File: file,
			dataType: 'json',
			headers: { "Content-Type": "application/json" }
		});
		return response;
	}

});

