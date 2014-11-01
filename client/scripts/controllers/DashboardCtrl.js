(function(angular){
  'use strict';

  angular.module('frontendEngineeringChallengeApp')
    .controller('DashboardCtrl', function ($scope, $rootScope, $timeout, LocalService) {

      // Attempt to get past records to display in our spreadsheet
      LocalService.getLikes();
      LocalService.getPosts();

      //***** Listeners *****//
      
      $rootScope.$on('local-posts-data-received', function(){
        // Moves up the call stack instead of using $scope.apply()
        $timeout(function(){
          $scope.posts = LocalService.posts();  
        });
      });

      $rootScope.$on('local-likes-data-received', function(){
        // Moves up the call stack instead of using $scope.apply()
        $timeout(function(){
          $scope.likes = LocalService.likes();
        });
      }); 



    });
}(window.angular));
