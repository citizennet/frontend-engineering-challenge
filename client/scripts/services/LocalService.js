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

	function postData(url, dataObj){
		var request = $http({
	            method: "post",
	            url: url,
	            params: {
	                action: "post"
	            },
	            
	            data: dataObj
	    });
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
	        var url = '/record';

	        postData(url, recordObj);
    	},
    	// Post the incoming Post Data
    	postPostData: function postPostData(postObj){
    		var url = '/post';

    		postData(url, postObj);	
    	},
    	// Post the incoming Like Data
    	postLikeData: function postLikeData(likeObj){
    		var url = '/like';

    		postData(url, likeObj);	
    	}
    }
  });
}(window.angular));