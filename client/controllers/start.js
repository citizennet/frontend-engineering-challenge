/* Angular Controller */
app.controller('start',['$scope','$location','info', function ($scope,$location,info) {
	$scope.header = info.returnHeader();
	$scope.data = {}		
	
	/* Load the data, then assign to the Angular Scope */
	var getData = function(){
		info.getFile().then(function(data){
			$scope.data = data.data; 
		});
	};
	getData();

	/* Define the model that controls the bindings for the view */	
	$scope.model = {filter:{likes:false,comments:false},filterAmount:{likes:{min:0,max:0},comments:{min:0,max:0}}};


	/* Filter to weed out values based on likes and comments */
	var allFilter = function(post){
		var likes = post.likes==undefined ? 0 : post.likes.count; 
		var comments = post.comments==undefined ? 0 : post.comments.count; 

		var minLikes = $scope.model.filterAmount.likes.min;
		var maxLikes = $scope.model.filterAmount.likes.max;
		var minComments = $scope.model.filterAmount.comments.min;
		var maxComments = $scope.model.filterAmount.comments.max;
	
		var filter=false;
		if(minLikes==maxLikes && minComments==maxComments){
			return post;
		}


		if((likes>=minLikes && likes<=maxLikes) && minComments+maxComments==0){
			filter=true;
		}
		if((comments>=minComments && comments<=maxComments) &&  minLikes+maxLikes==0){
			filter=true;
		}
		if(filter){
			return post;
		}else{
			if(likes>=minLikes && likes<=maxLikes){
				if(comments>=minComments && comments<=maxComments){
					return post;filteredPosts
				}
			}
		}
		
	};

	/* copies the data, seperates it based on the filter */
	$scope.seperatePosts = function(){
		var newData = [];
		for(var post=0;post<$scope.data.length;post++){
			var result = allFilter($scope.data[post]); 
			if (result!=undefined){
				newData.push(result);
			}
		};
		console.log(newData);
		$scope.filteredPosts = newData; 
	};


	/* Same filter as above, but on the angular end of things */
	$scope.all = function(post){
		var likes = post.likes==undefined ? 0 : post.likes.count; 
		var comments = post.comments==undefined ? 0 : post.comments.count; 

		var minLikes = $scope.model.filterAmount.likes.min;
		var maxLikes = $scope.model.filterAmount.likes.max;
		var minComments = $scope.model.filterAmount.comments.min;
		var maxComments = $scope.model.filterAmount.comments.max;
	
		var filter=false;
		if(minLikes==maxLikes && minComments==maxComments){
			return post;
		}


		if((likes>=minLikes && likes<=maxLikes) && minComments+maxComments==0){
			filter=true;
		}
		if((comments>=minComments && comments<=maxComments) &&  minLikes+maxLikes==0){
			filter=true;
		}
		if(filter){
			return post;
		}else{
			if(likes>=minLikes && likes<=maxLikes){
				if(comments>=minComments && comments<=maxComments){
					return post;
				}
			}
		}
		
	};
	
	/* Filter just for likes */
	$scope.likes = function(post){
		var likes = post.likes==undefined ? 0 : post.likes.count; 


		var minLikes = $scope.model.filterAmount.likes.min;
		var maxLikes = $scope.model.filterAmount.likes.max;
	
		if(minLikes==maxLikes){
			return post;
		}


		if((likes>=minLikes && likes<=maxLikes)){
			return post;
		}

		
	};
	
	/* Filter just for comments */
	$scope.comments = function(post){
		var comments = post.comments==undefined ? 0 : post.comments.count; 


		var minComments = $scope.model.filterAmount.comments.min;
		var maxComments = $scope.model.filterAmount.comments.max;
	
		if(minComments==maxComments){
			return post;
		}


		if((callFilteromments>=minComments && comments<=maxComments)){
			return post;
		}

		
	};
	$scope.updateFilters = function(type){
		if(type=='likes'){
			if($scope.model.filter.likes==false){
				$scope.model.filterAmount.likes.min=0;
				$scope.model.filterAmount.likes.max=0;					
			}
		}
		if(type=='comments'){
			if($scope.model.filter.comments==false){
				$scope.model.filterAmount.comments.min=0;
				$scope.model.filterAmount.comments.max=0;					
			}
		}
	};

	$scope.injectLinks = function(message){
		return message;
	};

	$scope.graphStatus = 'Show';
}]);

