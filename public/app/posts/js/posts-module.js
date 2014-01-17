var postsModule = angular.module('postsModule', []);

postsModule.controller('postsController', ['$scope', '$location', 'postsService', function ($scope, $location, postsService) {

    $scope.posts = postsService.getPosts().then(function (posts){
        return posts;
    });
}]);


postsModule.factory('postsService', ['$http', function ($http) {

    var PostsService = {
        getPosts: function () {

            var config = {
                method: 'GET',
                url: 'http://localhost/api/posts'
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
    return PostsService
}]);