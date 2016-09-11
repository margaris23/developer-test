// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.select',
  'ngSanitize',
  '720kb.datepicker',
  'myApp.api',
  'myApp.search',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  'use strict';

  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/search'});
}]);
