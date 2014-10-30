// This service allows us to persist information to our own MongoDB

(function(angular){

  angular.module('frontendEngineeringChallengeApp')
  .service('LocalService', function($http, $q, $rootScope){

  	// Initializations
  	var spreadsheetObj = [];


  	function handleError(response) {
  		// todo: Handle Errors
  		console.log('handling error for our own data persistance');
	}

	function handleSuccess(response) {
		console.log('successly received spreadsheet object');

		// Return spreadsheet array for our admin view
		spreadsheetObj = response.data;

		// Finally, broadcast a singular data-received event
		$rootScope.$broadcast('spreadsheet-data');
	}

  	// Expose Local Methods for our own Data Peristence
  	return {
  		spreadsheet: function spreadsheet(){
  			return spreadsheetObj;
  		},
  		// Pulls Data For Posts and Likes
  		getRecords: function getRecords(getRecords){
  			var request = $http({
	            method: "get",
	            url: '/records',
	            params: {
	                action: "get"
	            }
	        });

	        return( request.then(handleSuccess, handleError) )
  		},
    	postRecord: function postRecord(recordObj){
    		var request = $http({
	            method: "post",
	            url: '/record',
	            params: {
	                action: "post"
	            },
	            // attach the data name so we know which data object the response belongs to
	            data: recordObj
	        });
    	}
    }
  });
}(window.angular));