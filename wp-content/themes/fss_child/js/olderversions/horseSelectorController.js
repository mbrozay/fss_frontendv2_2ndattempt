// http://stackoverflow.com/questions/16509755/how-to-use-checkbox-to-filter-results-with-angular

var horseApp = angular.module('horseApp', []);


horseApp.controller('MainCtrl', function ($scope, $http, $log, Auth, PostHorses){
	
	$scope.horses = '';
	var successCallBack = function(response) {
     	 $scope.horses = response.data;
     	// $log.info(response);
     	
     	
   };
	
	var errorCallBack = function(response) {
		 $scope.error = response.data;
  };
  
  $scope.auth = Auth;
  $scope.login = function() {
	  Auth.login();
    };

    $scope.logout = function() {
    	Auth.logout();
    };

    $scope.isAuthenticated = function() {
      return $scope.loggedIn;
    };
    
    $scope.ph = PostHorses;	
    $scope.post = function(data){
/*    	PostHorses.testFunction();
    	PostHorses.testsubmit(horses);*/
    	var arr = [];
    	for(var i in data){
    	       if(data[i].selectedHorse==true){
    	           arr.push(data[i].horseid);
    	       }
    	}
    	var jsondata = JSON.stringify(arr);
    	return jsondata;
    }
    
        $http({
        		method:'Get',
        		url:'http://localhost:8080/fss-rest-json/horseSelector'})
        		.then(successCallBack, errorCallBack);
        
        
       
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


