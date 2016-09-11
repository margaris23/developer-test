angular.module('myApp.results.controller', ['myApp.api'])

.controller('ResultsCtrl', ['$location', 'ApiSvc', function ($location, ApiSvc) {
    
    var vm = this;

    /* validate input and redirect to search */
    var search = $location.search();
    if(!search.from || !search.to || !search.start || !search.end) {
        $location.path('/');
        return;
    }

    vm.flights = [];
    vm.loading = true;
    vm.dateFormat = 'yyyy-MM-dd';

    ApiSvc.cheapFlights(search.from, search.to, search.start, search.end)
        .then(function (results) {
            vm.flights = results.flights;
            vm.loading = false;
        });

}]);