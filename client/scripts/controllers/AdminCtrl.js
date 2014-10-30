(function(angular){
  'use strict';

  /***** Main stage events on $scope *****/
  // 'accessing-api' notifies that were are in the process of accessing API
  // 'data-received' notifies we have received a 'successful' response from the API endpoint
  // 'save-complete' notifies that we have persisted the data to our own local storage

  angular.module('frontendEngineeringChallengeApp')
    .controller('AdminCtrl', function ($scope, $rootScope, $timeout, $interval, APIService, LocalService) {

      // After a successful API call, we will replace our API objects
      var receivedPostsData = false;
      $scope.APIpostsData = undefined;

      var receivedLikesData = false;
      $scope.APIlikesData = undefined;

      // Attempt to get past records
      LocalService.getRecords();

      // Persist the data received from API to our own storage
      function persistData(data){
          $scope.status = 'Mocking Saving Data';

          // When this is complete fire off the save-complete event
          $timeout(function(){
            // Persist record and push record onto our spreadsheet
            var record = constructRecordObj();
            // Get it to show locally
            $scope.spreadsheet.push(record);

            // Persist it to our Mongo Database
            LocalService.postRecord(record);

            $scope.lastTimestamp = record.time;
            $scope.$broadcast('save-complete');
          }, 2000);
      }

      // The API process is started, and is continued on interval until success
      var timer;
      function stopTimer(){
        $interval.cancel(timer);
      }

      function accessAPI() {
        // Access the API through our service only if we don't have values
        if (!receivedPostsData)
          APIService.getPostsData();
        
        if (!receivedLikesData)
          APIService.getLikesData();
      }

      function intervalAPI(){

        timer = $interval(function(){
          $scope.status = 'Unsuccessful. Retrying Access of API every 15 seconds';
          accessAPI();

          if (receivedPostsData && receivedLikesData)
            stopTimer();

        }, 15000);
        
      }

      // Accesses the API by using an asynchronous Service GET request, continues until all data is successful
      $scope.startAPI = function(){
        $scope.status = 'Accessing API';
        $scope.$broadcast('accessing-api');
        accessAPI();

        // todo: Do we want to call intervalAPI from startAPI?
        // betterQuestion, do we want our interval to be initiated from the start?
        intervalAPI();

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

      // When we receive our spreadsheet object
      $rootScope.$on('spreadsheet-data', function(){
        console.log('this is our spreadsheet object');
        $scope.spreadsheet = LocalService.spreadsheet().records;
        console.log($scope.spreadsheet);
      })


      /***** Helper Functions *****/

      // Generates a UUID ref: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
      function generateUUID(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
      };

      // Constructs record object for our admin table display data
      function constructRecordObj(){
        var now = new Date();
        // todo: mocked data
        var lastDate = now.toDateString();
        var lastTime = now.toTimeString();
        var lastID = generateUUID();
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
