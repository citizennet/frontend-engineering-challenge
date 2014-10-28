(function(angular){
  'use strict';

  angular.module('frontendEngineeringChallengeApp')
    .controller('AdminCtrl', function ($scope) {

      $scope.hello = 'This is a hello dictated by the Admin controller';
      $scope.lastTimestamp = 'Mocked 01/04/2012 at 11:36pm';
    });
}(window.angular));
