/* Angular Controller */
app.controller('start',['$scope','$location','info', function ($scope,$location,info) {
	$scope.header = info.returnHeader();
	$scope.data = {}		

	var getData = function(){
		info.getFile().then(function(data){
			$scope.data = data.data; 
		});
	};
	getData();
	
	$scope.model = {filter:{likes:false,comments:false},filterAmount:{likes:{min:0,max:0},comments:{min:0,max:0}}};

//<!--ng-if="post.likes.count>=model.filterAmount.likes.min && post.likes.count<=model.filterAmount.likes.max" !-->
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
	$scope.comments = function(post){
		var comments = post.comments==undefined ? 0 : post.comments.count; 


		var minComments = $scope.model.filterAmount.comments.min;
		var maxComments = $scope.model.filterAmount.comments.max;
	
		if(minComments==maxComments){
			return post;
		}


		if((comments>=minComments && comments<=maxComments)){
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
}]);

app.filter('likeSort', function() {
	var functions = {};
	functions = {
		main:function(data) {
			return data;
		}
	};

	return functions.main
});
