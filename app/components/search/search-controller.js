angular.module('myApp.search.controller', ['myApp.search.service'])

.controller('SearchCtrl', ['SearchSvc', '$location', function (SearchSvc, $location) {
    var vm = this;

    vm.flight = {
        origin: null,
        destination: null,
        dateStart: null,
        dateEnd: null
    };

    vm.dateFormat = 'yyyy-MM-dd';

    vm.airports = [];
    vm.routes = [];

    function stripDashes(strDate) {
        return strDate.replace(/-/g, '');
    }

    function constructUrlParams() {
        return [
            'from=' + vm.flight.origin,
            'to=' + vm.flight.destination,
            'start=' + vm.flight.dateStart,
            'end=' + vm.flight.dateEnd
        ].join('&');
    }

    vm.go = function () {
        if (!vm.flight.origin ||
            !vm.flight.destination ||
            !vm.flight.dateStart ||
            !vm.flight.dateEnd) {
            // TODO: show errors
            return;
        }

        $location.path('/results?' + constructUrlParams());
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

        var startDate = stripDashes(vm.flight.dateStart);
        var endDate = stripDashes(vm.flight.dateEnd);

        if (startDate > endDate) {
            vm.flight.dateEnd = vm.flight.dateStart;
        }
    };

    vm.endDateChanged = function () {
        if(!vm.flight.dateStart || !vm.flight.dateEnd) {
            return;
        }

        // TODO: validate date

        var endDate = stripDashes(vm.flight.dateEnd);
        var startDate = stripDashes(vm.flight.dateStart);

        if (endDate < startDate) {
            vm.flight.dateStart = vm.flight.dateEnd;
        }
    };

}]);
