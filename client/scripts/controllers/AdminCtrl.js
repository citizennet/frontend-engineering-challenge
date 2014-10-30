(function(angular){
  'use strict';

  /***** Main stage events on $scope *****/
  // 'accessing-api' notifies that were are in the process of accessing API
  // 'data-received' notifies we have received a 'successful' response from the API endpoint
  // 'save-complete' notifies that we have persisted the data to our own local storage

  angular.module('frontendEngineeringChallengeApp')
    .controller('AdminCtrl', function ($scope, $rootScope, $timeout, APIService) {

      $scope.hello = 'This is a hello dictated by the Admin controller';
      $scope.lastTimestamp = 'Mocked 01/04/2012 at 11:36pm';

      // After a successful API call, we will replace our API objects
      var receivedPostsData = false;
      $scope.APIpostsData = undefined;

      var receivedLikesData = false;
      $scope.APIlikesData = undefined;

      // Accesses the API by using an asynchronous Service GET request
      function accessAPI(){
          $scope.status = 'Accessing API';
          $scope.$broadcast('accessing-api');

          // Access the API through our service only if we don't have values
          if (!receivedPostsData)
            APIService.getPostsData();  
          else 
            console.log('no need for another API call, we have the posts data');
          
          if (!receivedLikesData)
            APIService.getLikesData();
          else
            console.log('no need for another API call, we have the likes data');
      }

      // Persist the data received from API to our own storage
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
      $rootScope.$on('data-received', function(){
        // Check our API Data objects and determine what we have received
        var APIObjects = APIService.APIObjects();

        console.log('data-received event fired, here is the data we have->');
        console.log(APIObjects);

        // Determine what data has been received
        if (APIObjects.posts !== undefined) { receivedPostsData = true; }
        if (APIObjects.likes !== undefined) { receivedLikesData = true; }

        // Persist the data received
        //persistData(data);
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
