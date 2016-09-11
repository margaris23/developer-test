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

    function stripSlashes(strDate) {
        return strDate.replace(/\//g, '');
    }

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

    vm.startDateChanged = function () {
        if(!vm.flight.dateStart || !vm.flight.dateEnd) {
            return;
        }

        // TODO: validate date

        var startDate = stripSlashes(vm.flight.dateStart);
        var endDate = stripSlashes(vm.flight.dateEnd);

        if (startDate > endDate) {
            vm.flight.dateEnd = vm.flight.dateStart;
        }
    };

    vm.endDateChanged = function () {
        if(!vm.flight.dateStart || !vm.flight.dateEnd) {
            return;
        }

        // TODO: validate date

        var endDate = stripSlashes(vm.flight.dateEnd);
        var startDate = stripSlashes(vm.flight.dateStart);

        if (endDate < startDate) {
            vm.flight.dateStart = vm.flight.dateEnd;
        }
    };

}]);
