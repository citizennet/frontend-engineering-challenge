'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('avatar', [function () {
   return {
     restrict: 'E',
     link:function(scope, element, attrs) {
     var hash = ""
	 var email = attrs.email;
      if ((email !== null) && (email !== undefined) && (email !== '')){
        var hash = md5.createHash(email.toLowerCase());
      }
      var src = 'https://secure.gravatar.com/avatar/' + hash + '?s=200&d=mm'
      var tag = '<img src=' + src + ' class="img-responsive"/>'
	  
	  element.append(tag);
     }
   };
 }]);
