angular.module('myApp.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
  'use strict';

  return function(scope, elem, attrs) {
    elem.text(version);
  };
}]);
