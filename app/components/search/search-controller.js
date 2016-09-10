angular.module('myApp.search.controller', ['myApp.search.service'])

.controller('SearchCtrl', ['SearchSvc', function(SearchSvc) {
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

    vm.update = function (option, searchValue) {
        switch(option) {
        case 1:

            if(!searchValue) {
                return;
            }

            SearchSvc.getOrigins(searchValue)

            .then(function(result) {
                console.log(result.airports);
                vm.airports = result.airports;
                vm.routes = result.routes;
            });

            break;
        case 2:
            break;
        default:
            console.error('unknown options');
        }
    };

}]);
