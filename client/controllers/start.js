/* Angular Controller */
app.controller('start',['$scope','$location','info', function ($scope,$location,info) {
	$scope.header = info.returnHeader(); 	
}]);
