'use strict';

angular.module('myApp.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elem, attrs) {
    elem.text(version);
  };
}]);
