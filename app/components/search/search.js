angular.module('myApp.search', [
	'ngRoute',
	'myApp.search.controller',
	'myApp.search.service'
])

.config(['$routeProvider', function($routeProvider) {
  'use strict';

  $routeProvider.when('/search', {
    templateUrl: 'components/search/search.html',
    controller: 'SearchCtrl',
	controllerAs: 'sc'
  });

}]);
