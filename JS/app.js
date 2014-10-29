angular.module("citizenNet", [])
		.controller("citizenNetCtrl", citizenNetCtrl);
		function citizenNetCtrl($scope, $http, $timeout) {
			

			function init(){
				$scope.reloadCount = 0;
				$scope.reloadLimit = 5;
				getData();
			}

			function getData() {
				$scope.reloadCount++;
				var reloadData = false;


				// Get Post data
				getPost()
					.then(function(data) {
						$scope.postData = data.data.data;
						console.log(data);
					},
					function(error) {
				       console.log("POST ERROR: %O", error);
				       reloadData = true;
				    });


				// Get Like data
				getLike()
					.then(function(data){
						$scope.likeData = data.data.data;
						console.log(data.data.data);
					},
					function(error) {
				       console.log("LIKE ERROR: %O", error);
				       reloadData = true;
				    });

				// reload data a max of x times
				if ($scope.reloadCount < $scope.reloadLimit) {
					// Perform reload if api error after 2 sec
					$timeout(function() {
						if (reloadData == true) {
							getData();
						}
					}, 2000);
				}
			}


			function getPost(){

				var url = 'http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6';
				
				return $http.get(url)
					.success(function(response){
						//
					})
					.error(function(response,status){
						//
					});
			}

			function getLike(){
				var url = 'http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6';
				
				return $http.get(url)
					.success(function(response){
						//
					})
					.error(function(response,status){
						//
					});
			}

			init();
		}


