(function(angular){
'use strict';

angular.module('frontendEngineeringChallengeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/admin', {
          templateUrl: 'partials/admin.html',
          controller: 'AdminCtrl'
        }) 
        .when('/dashboard', {
          templateUrl: 'partials/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .otherwise({
          redirectTo: '/admin'
        });

    $locationProvider.html5Mode(true);
  });
}(window.angular));