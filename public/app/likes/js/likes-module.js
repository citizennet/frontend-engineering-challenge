var likesModule = angular.module('likesModule', []);

likesModule.controller('likesController', ['$scope', '$location', 'likesService', function ($scope, $location, likesService) {

    $scope.likes = likesService.getLikes().then(function (likes){
                  return likes;
    });

}]);

likesModule.factory('likesService', ['$http', function ($http) {

    var LikesService = {
        getLikes: function () {

            var config = {
                method: 'GET',
                url: 'http://localhost/api/likes'
            };

            var promise = $http(config).then(function (response) {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return response.data;
                    window.alert('Oh Snap! We got an HTTP ' + response.status + ' error. Try again later.');
                }
            });
            return promise;
        }
    };
    return LikesService
}]);