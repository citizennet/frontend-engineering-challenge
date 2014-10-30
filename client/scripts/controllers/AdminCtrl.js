(function(angular){
  'use strict';

  /***** Main stage events on $scope *****/
  // 'accessing-api' notifies that were are in the process of accessing API
  // 'data-received' notifies we have received a 'successful' response from the API endpoint
  // 'save-complete' notifies that we have persisted the data to our own local storage

  angular.module('frontendEngineeringChallengeApp')
    .controller('AdminCtrl', function ($scope, $rootScope, $timeout, $interval, APIService) {

      // After a successful API call, we will replace our API objects
      var receivedPostsData = false;
      $scope.APIpostsData = undefined;

      var receivedLikesData = false;
      $scope.APIlikesData = undefined;

      $scope.spreadsheet = [];

      // Persist the data received from API to our own storage
      function persistData(data){
          $scope.status = 'Mocking Saving Data';

          // When this is complete fire off the save-complete event
          $timeout(function(){
            var record = constructRecordObj();
            // Persist record and push record onto our spreadsheet
            $scope.spreadsheet.push(record);

            $scope.lastTimestamp = 'Mocked 10/28/2014 at 11:36pm';
            $scope.$broadcast('save-complete');
          }, 2000);
      }

      var timer;
      function stopTimer(){
        $interval.cancel(timer);
      }

      // Accesses the API by using an asynchronous Service GET request, continues until all data is successful
      $scope.accessAPI = function(){
        $scope.status = 'Accessing API';
        $scope.$broadcast('accessing-api');

        timer = $interval(function(){
          
          // Access the API through our service only if we don't have values
          if (!receivedPostsData)
            APIService.getPostsData();
          
          if (!receivedLikesData)
            APIService.getLikesData();

          if (receivedPostsData && receivedLikesData)
            stopTimer();

        }, 3000);

      }

      /***** Listeners *****/
      // Listening for the data to be successfully return from the API
      $rootScope.$on('data-received', function(){
        // Check our API Data objects and determine what we have received
        var APIObjects = APIService.APIObjects();

        // Determine what data has been received
        if (APIObjects.posts !== undefined) { receivedPostsData = true; }
        if (APIObjects.likes !== undefined) { receivedLikesData = true; }

        // If we successfully have all objects, persist the data received
        if (receivedPostsData && receivedLikesData){
          console.log('Here is the object we are saving');
          console.log(APIObjects);
          persistData(APIObjects);
        }

      });


      /***** Helper Functions *****/

      // Constructs record object for our admin table display data
      function constructRecordObj(){
        // todo: mocked data
        var lastDate = '10/28/2014';
        var lastTime = '11:36pm';
        var lastID = '89ysgdf';
        return {
          date: lastDate,
          time: lastTime,
          id:   lastID
        };
      }


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
    })
    .directive('savebtn', function(){
      return function(scope, elem) {
        scope.$on('save-complete', function(){
          elem.addClass('disabled');
        });
      };
    });
}(window.angular));
