var app = angular.module('app', ['dashboardModule', 'likesModule', 'postsModule']).config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/dashboard', {
        templateUrl: '/app/dashboard/partials/dashboard.html',
        controller: 'dashboardController'
    });

    $routeProvider.when('/likes', {
        templateUrl: '/app/likes/partials/likes.html',
        controller: 'likesController'
    });

    $routeProvider.when('/posts', {
        templateUrl: '/app/posts/partials/posts.html',
        controller: 'postsController'
    });

    $routeProvider.otherwise({
        redirectTo: '/dashboard'
    });
}]);
