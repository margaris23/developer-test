// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.search',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  'use strict';

  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/search'});
}]);
