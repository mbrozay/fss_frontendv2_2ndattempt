var app = angular.module('signupSubmit', []);


app.controller('SignupSubmitController',[ '$scope', '$http', function($scope, $http) {
	
	$scope.submit = function() {
		
		var signupData = {
                "firstName" : $scope.signupData.firstName,
                "lastName" : $scope.signupData.lastName,
                "username" : $scope.signupData.username,
                "password" : $scope.signupData.password
        };
		
		var signupjsondata = JSON.stringify(signupData);
		var response = $http.post('http://localhost:8080/fss-rest-json/signup', signupjsondata);
        response.success(function(data, status, headers, config) {
            $scope.message = data;
        });
        response.error(function(data, status, headers, config) {
            alert( "Exception details: " + JSON.stringify({data: data}));
        });
	}
	
	
}]);