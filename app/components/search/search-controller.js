angular.module('myApp.search.controller', ['myApp.search.service'])

.controller('SearchCtrl', ['SearchSvc', function (SearchSvc) {
    var vm = this;

    vm.flight = {
        origin: null,
        destination: null,
        dateStart: null,
        dateEnd: null
    };

    vm.airports = [];
    vm.routes = [];

    vm.go = function () {
        console.log(vm.form);
        // TBD...
    };

    vm.getOrigins = function (searchValue) {
        if(!searchValue) {
            return;
        }

        SearchSvc
            .getOrigins(searchValue)
            .then(function(result) {
                console.log(result.airports);
                vm.airports = result.airports;
                vm.routes = result.routes;
            });
    };

    vm.onOriginSelected = function (origin) {
        /* cleanup selected destination first */
        vm.routes = [];
        vm.flight.destination = null;

        /* and then search */
        SearchSvc
            .getDestinations(origin)
            .then(function (result) {
                vm.routes = result.routes;
                vm.flight.destination = vm.routes[0];
            });
    };

}]);
