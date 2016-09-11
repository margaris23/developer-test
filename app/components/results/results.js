angular.module('myApp.results', [
    'ngRoute',
    'myApp.results.controller'
])

.config([ '$routeProvider', function($routeProvider) {
    'use strict';

    $routeProvider.when('/results', {
        templateUrl: 'components/results/results.html',
        controller: 'ResultsCtrl',
        controllerAs: 'rc'
    });
}]);
