/* Angular Controller */
app.controller('start',['$scope','$location','info', function ($scope,$location,info) {
	$scope.header = info.returnHeader();
	$scope.data = {}		

	var getData = function(){
		info.getFile().then(function(data){
			$scope.data = data; 
		});
	};
	getData();
}]);
