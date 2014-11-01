// This service allows us to persist information to our own MongoDB

(function(angular) {

    angular.module('frontendEngineeringChallengeApp')
        .service('LocalService', function($http, $q, $rootScope) {

            // Initializations
            var spreadsheetObj = [];
            var postsObj = {};
            var likesObj = {};


            function handleError(response) {
                // todo: Handle Errors
                console.log('handling error for our own data persistance');
            }

            function handleSuccess(response) {
                console.log('successly received spreadsheet object');

                // Return spreadsheet array for our admin view
                spreadsheetObj = response.data;

                // Finally, broadcast a singular data-received event
                $rootScope.$broadcast('spreadsheet-data');
            }
            function handlePostsSuccess(response) {
                console.log('successly received posts object');

                // Return spreadsheet array for our admin view
                postsObj = response.data;
                $rootScope.$broadcast('local-posts-data-received');
            }

            function handleLikesSuccess(response) {
                console.log('successly received likes object');

                // Return spreadsheet array for our admin view
               likesObj = response.data;
                $rootScope.$broadcast('local-likes-data-received');
            }

            function postData(url, dataObj) {
                var request = $http({
                    method: "post",
                    url: url,
                    params: {
                        action: "post"
                    },

                    data: dataObj
                });
            }

            // Expose Local Methods for our own Data Peristence
            return {
                spreadsheet: function spreadsheet() {
                    return spreadsheetObj;
                },
                // Pulls Data For Posts and Likes
                getRecords: function getRecords() {
                    var request = $http({
                        method: "get",
                        url: '/records',
                        params: {
                            action: "get"
                        }
                    });

                    return ( request.then(handleSuccess, handleError) )
                },

                getPosts: function getPosts() {
                    var request = $http({
                        method: "get",
                        url: '/posts',
                        params: {
                            action: "get"
                        }
                    });

                    return ( request.then(handlePostsSuccess, handleError) )
                },

                getLikes: function getLikes() {
                    var request = $http({
                        method: "get",
                        url: '/likes',
                        params: {
                            action: "get"
                        }
                    });

                    return ( request.then(handleLikesSuccess, handleError) )
                },

                postRecord: function postRecord(recordObj) {
                    var url = '/record';

                    postData(url, recordObj);
                },
                // Post the incoming Post Data
                postPostData: function postPostData(postObj) {
                    var url = '/post';

                    postData(url, postObj);
                },
                // Post the incoming Like Data
                postLikeData: function postLikeData(likeObj) {
                    var url = '/like';

                    postData(url, likeObj);
                },

                posts: function posts(){
                  return postsObj;
                },

                likes: function likes(){
                  return likesObj;
                }
            }
        });
}(window.angular));