// http://stackoverflow.com/questions/16509755/how-to-use-checkbox-to-filter-results-with-angular

var horseApp = angular.module('horseApp', ['ngRoute', 'ngCookies']);


horseApp.controller('MainCtrl', function ($scope, $http, $log, Auth, PostHorses, $cookies){
	
	$scope.horses = '';
	/*Testing Get with hardcoded value in java */
	 
	 /* var successCallBack = function(response) {
     	 $scope.horses = response.data;   	
     	
   };
	
	var errorCallBack = function(response) {
		 $scope.error = response.data;
  };
  
        $http({
        		method:'Get',
        		url:'http://localhost:8080/fss-rest-json/horseSelector'})
        		.then(successCallBack, errorCallBack);*/
        
	var jsondata = {
            "sessionToken" : $cookies.get('auth'),
    };
	var jsondataStringify = JSON.stringify(jsondata);
	var response = $http.post('http://localhost:8080/fss-rest-json/getHorses', jsondataStringify);
    response.success(function(data, status, headers, config) {
        $scope.horses = data;
    });
    response.error(function(data, status, headers, config) {
        alert( "Exception details: " + JSON.stringify({data: data}));
    });
	
        /*example of a service*/
   //     $scope.ph = PostHorses;	
        
        /*Calling submit for horses. needs to be refactored out of controller */
        $scope.post = function(data){

        	var arr = [];
        	for(var i in data){
        	       if(data[i].selectedHorse==true){
        	           arr.push(data[i].horseid);
        	       }
        	}
        	var jsondata = {
                    "sessionToken" : $cookies.get('auth'),
                    "selectedHorses" : arr
            };
        	var jsondataStringify = JSON.stringify(jsondata);
        	
        	
        	var response = $http.post('http://localhost:8080/fss-rest-json/horsePicker', jsondataStringify);
            response.success(function(data, status, headers, config) {
                $scope.message = data;
            });
            response.error(function(data, status, headers, config) {
                alert( "Exception details: " + JSON.stringify({data: data}));
            });

        }
        
       
      });

horseApp.service('Auth', function() {
	  var auth = {};

	  auth.loggedIn = false;

	  auth.login = function() {
	    auth.loggedIn = true;
	  };

	  auth.logout = function() {
	    auth.loggedIn = false;
	  };
	  
	  

	  return auth;
	});

/*service called from controller - example only*/
horseApp.service('PostHorses', function($filter,$http){
	var ph = {};
	ph.message = 'Hi';
	ph.testFunction = function() {
		ph.message = 'Bye';
		
	  };
	  
	  ph.testsubmit = function(horses) {
		  var i, len;
		   
		    if (horses){
		    	var checkedHorses = $filter('filter')(horses, {selectedHorse: true});
		    	
		    }
		  
	  }
	  
	return ph;
});

// Define our filter
horseApp.filter('selectedHorses', function($filter) {
  return function(horses) {
    var i, len;
   
    if (horses){
    // get customers that have been checked
    var checkedHorses = $filter('filter')(horses, {selectedHorse: true});
    
    // Add in a check to see if any customers were selected. If none, return 
    // them all without filters
    if(checkedHorses.length == 0) {
      return;
    }
    
    // get all the unique cities that come from these checked customers
    var horseIds = {};
    for(i = 0, len = checkedHorses.length; i < len; ++i) {
      // if this checked customers cities isn't already in the cities object 
      // add it
      if(!horseIds.hasOwnProperty(checkedHorses[i].horseid)) {
    	  horseIds[checkedHorses[i].horseid] = true;
      }
    }
    
    // Now that we have the cities that come from the checked customers, we can
    //get all customers from those cities and return them
    var ret = [];
    for(i = 0, len = horses.length; i < len; ++i) {
      // If this customer's city exists in the cities object, add it to the 
      // return array
      if(horseIds[horses[i].horseid]) {
        ret.push(horses[i]);
      } 
    }
    }
   
    
    // we have our result!
    return ret;
  };
});


