angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  'use strict';

  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', [function() {

}]);
