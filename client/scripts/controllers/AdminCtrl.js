(function(angular){
  'use strict';

  /***** Main stage events on $scope *****/
  // 'accessing-api' notifies that were are in the process of accessing API
  // 'data-received' notifies we have received a 'successful' response from the API endpoint
  // 'save-complete' notifies that we have persisted the data to our own local storage

  angular.module('frontendEngineeringChallengeApp')
    .controller('AdminCtrl', function ($scope, $timeout) {

      $scope.hello = 'This is a hello dictated by the Admin controller';
      $scope.lastTimestamp = 'Mocked 01/04/2012 at 11:36pm';
      $scope.APIObject = undefined;

      function accessAPI(){
          $scope.status = 'Accessing API';
          $scope.$broadcast('accessing-api');
          $timeout(function(){
            // todo: Remove Mocking of API object received
            $scope.APIObject = {data: 'SomeInformationHere'};
            $scope.$broadcast('data-received')
          }, 4000);
      }

      function persistData(data){
          $scope.status = 'Saving Data';
          $timeout(function(){
            $scope.$broadcast('save-complete');
          }, 2000);
      }


      $scope.apiSave = function(){
        console.log('Hitting API and initiating saving function');
        // attempts to access the api
        accessAPI(); 
      }

      /***** Listeners *****/
      // Listening for the data to be successfully return from the API
      $scope.$on('data-received', function(){
        var data = $scope.APIObject;
        console.log('received this data ->');
        console.log(data);

        // Persist the data received
        persistData(data);
      });


    })
    .directive('dialog', function(){
      return function(scope, elem) {
        scope.$on('accessing-api', function(){
          elem.css({
            top: '75px'
          });
        });

        scope.$on('save-complete', function(){
          elem.css({
            top: '-120px'
          });
          console.log('Save is complete and recognized, {from directive}');  
        });
      };
    });
}(window.angular));
