(function(angular){

  angular.module('frontendEngineeringChallengeApp')
  .service('APIService', function($http, $q, $rootScope){

  	// todo: Access token hard coded, would want to replace with session based access token
  	//***** API Initializations *****//

  	var postsURL = 'http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6';
  	var likesURL = 'http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6';

  	// API Data objects
  	var postsData = undefined;
  	var likesData = undefined;


	//***** API functions *****//  	

  	// pullData is for get requests only
  	function pullData(url, dataName){
  		var request = $http({
            method: "get",
            url: url,
            params: {
                action: "get"
            },
            // attach the data name so we know which data object the response belongs to
            dataName: dataName
        });

    	return( request.then(handleSuccess, handleError) );
  	}

  	function handleError(response) {
  		// todo: Handle Errors
  		console.log('handling error')
	    // // Response should be normalized. If not, we normalize it ourselves
	    // if (!angular.isObject( response.data ) ||
	    //     !response.data.message) {
	    //      	return( $q.reject( "An unknown error occurred." ) );
	    // }

	    // // Otherwise, use expected error message.
	    // return( $q.reject( response.data.message ) );
	}

	function handleSuccess(response) {
		console.log('success for ' + response.config.dataName);

		// Determines which API call returned successfully and notifies our AdminCtrl
		switch (response.config.dataName){
		case 'posts':
			postsData = response.data;
			$rootScope.$broadcast('posts-data-received');
			break;
		case 'likes':
			likesData = response.data;
			$rootScope.$broadcast('likes-data-received');
			break;	
		}

		// Finally, broadcast a singular data-received event
		$rootScope.$broadcast('data-received');
	}

	// Locally exposed methods in APIService
  	return {
  		// Pulls Data For Posts and Likes
    	getPostsData: function getPostsData(){
    		pullData(postsURL, 'posts');
    	},

    	getLikesData: function getLikesData(){
    		pullData(likesURL, 'likes');	
    	},

    	// Returns our local APIObjects
    	APIObjects: function APIObjects(){
    		return {posts: postsData, likes: likesData};
    	}  
    }

  });
}(window.angular));