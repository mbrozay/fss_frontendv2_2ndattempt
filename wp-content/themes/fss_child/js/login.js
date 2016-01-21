// var loginApp = angular.module('loginApp', ['ngRoute', 'ngCookies']);

horseApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'http://localhost/fss_frontendv2/wp-content/themes/fss_child/templates/LoginTemplate.html'
	})
	.when('/loggedin',{
		resolve: {
			"check" : function($location, $rootScope){
				if (!$rootScope.loggedIn){
					$location.path('http://localhost/fss_frontendv2/wp-content/themes/fss_child/templates/LoginTemplate.html');
				}
			}
		},
		templateUrl: 'LoggedIn.html'
	})
	.when('/horseselector',{
		resolve: {
			"check" : function($location, $rootScope, $cookies){
				var checkLoggedIn = $cookies.get('auth');
				if (checkLoggedIn=="null"){
					$location.path('/');
				}
			}
		},
		templateUrl: 'http://localhost/fss_frontendv2/wp-content/themes/fss_child/templates/HorseSelectorTemplate.html'
	})
	.otherwise({
		redirectTo: '/'
	});
	
});

horseApp.controller('loginCtrl', function($scope, $location, $rootScope, $http, $cookies){
	
	$scope.submitLogin = function(){

		var loginData = {
				
				"username" : $scope.loginData.username,
                "password" : $scope.loginData.password
		}
		var loginjsondata = JSON.stringify(loginData);
		
		var response = $http.post('http://localhost:8080/fss-rest-json/login', loginjsondata);
        response.success(function(data, status, headers, config) {
            $scope.message = data;
            $cookies.put('auth',$scope.message.response);
            $location.path('/horseselector');
        });
        response.error(function(data, status, headers, config) {
            alert( "Exception details: " + JSON.stringify({data: data}));
        });
        
	}

		/*if ($scope.message=="You are logged in successfully"){
			$rootScope.loggedIn = true;
			$location.path('/horseselector');
		} else {
			alert("wrong credentials");
		}*/
			
	
});