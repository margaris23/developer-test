angular.module('myApp.search.controller', ['myApp.search.service'])

.controller('SearchCtrl', ['SearchSvc', '$location', function (SearchSvc, $location) {
    var vm = this;

    vm.flight = {
        origin: null,
        destination: null,
        dateStart: null,
        dateEnd: null
    };

    vm.visible = {
        endDatePicker: false,
        startDatePicker: false
    };

    vm.dateFormat = 'yyyy-MM-dd';

    vm.airports = [];
    vm.routes = [];

    /* cleaup errors initially */
    errorCleanup();

    function errorCleanup() {
        vm.error = {
            origin: null,
            destination: null,
            dateStart: null,
            dateEnd: null
        };
    }

    function stripDashes(strDate) {
        return strDate.replace(/-/g, '');
    }

    vm.go = function () {

        /* reset pickers */
        vm.visible.endDatePicker = false;
        vm.visible.startDatePicker = false;

        if (!vm.flight.origin) {
            vm.error.origin = "Invalid airport chosen.";
            return;
        }

        if (!vm.flight.destination) {
            vm.error.destination = "Invalid airport chosen.";
            return;
        }

        if (!vm.flight.dateStart) {
            vm.error.dateStart = "Invalid start date chosen.";
            return;
        }

        if (!vm.flight.dateEnd) {
            vm.error.dateEnd = "Invalid end date chosen.";
            return;
        }

        $location.path('/results')
            .search('from', vm.flight.origin.selected.code)
            .search('to', vm.flight.destination.selected.code)
            .search('start', vm.flight.dateStart)
            .search('end', vm.flight.dateEnd);
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
            }, function (error) {
                if (error) {
                    vm.error.destination = "Error finding airports. Please try again later.";
                }
            });
    };

    vm.onOriginSelected = function (origin) {
        /* cleanup selected destination first */
        vm.routes = [];
        vm.flight.destination = null;

        errorCleanup();

        /* and then search */
        SearchSvc
            .getDestinations(origin)
            .then(function (result) {
                vm.routes = result.routes;
            }, function (error) {
                if (error) {
                    vm.error.destination = "Error finding destination. Please try again later.";
                }
            });
    };

    vm.startDateChanged = function () {
        if(vm.visible.startDatePicker) {
            vm.toggleCalendar(1);
        }

        if(!vm.flight.dateStart) {
            return;
        }

        errorCleanup();

        // TODO: validate date

        var startDate = stripDashes(vm.flight.dateStart);

        if(!vm.flight.dateEnd) {
            vm.flight.dateEnd = vm.flight.dateStart;
            return;
        }

        var endDate = stripDashes(vm.flight.dateEnd);

        if (startDate > endDate) {
            vm.flight.dateEnd = vm.flight.dateStart;
        }
    };

    vm.endDateChanged = function () {
        if(vm.visible.endDatePicker) {
            vm.toggleCalendar(2);
        }

        if(!vm.flight.dateEnd) {
            return;
        }

        errorCleanup();

        // TODO: validate date

        var endDate = stripDashes(vm.flight.dateEnd);

        if(!vm.flight.dateStart) {
            vm.flight.dateStart = vm.flight.dateEnd;
            return;
        }

        var startDate = stripDashes(vm.flight.dateStart);

        if (endDate < startDate) {
            vm.flight.dateStart = vm.flight.dateEnd;
        }
    };

    vm.toggleCalendar = function (option) {
        switch(option){
        case 1:
            vm.visible.startDatePicker = !vm.visible.startDatePicker;

            /* only one calendar should be visible */
            if (vm.visible.startDatePicker && vm.visible.endDatePicker) {
                vm.visible.endDatePicker = false;
            }

            break;
        case 2:
            vm.visible.endDatePicker = !vm.visible.endDatePicker;

            /* only one calendar should be visible */
            if (vm.visible.startDatePicker && vm.visible.endDatePicker) {
                vm.visible.startDatePicker = false;
            }

            break;
        default:
            /* noop */
        }
    };

}]);
