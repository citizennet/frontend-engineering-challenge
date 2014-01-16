/* Start Defining the App */
var app = angular.module('CNEC', ['ui.bootstrap','ngUpload','ngRoute','ngResource']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when('/start', {templateUrl: 'views/start.html',   controller: 'start'}).
	otherwise({redirectTo: '/start'});
}]);

/* Define the Factory which is going to move data from the server to the client and back again */ 
app.factory('info',['$http', function($http) {
	var data = {header:"Lets Get This Started!"};
	var action = {}; 
	action = {
		returnHeader:function(){
			return data.header; 
		}
	};
    return action;
}])
