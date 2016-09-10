angular.module('myApp.search.service', [ 'myApp.api' ])

.factory('SearchSvc', [
    '$q',
    '$cacheFactory',
    'ApiSvc',

    function ($q, $cacheFactory, ApiSvc) {

        return {
            getOrigins: function (predicate) {
                var deferred = $q.defer();

                ApiSvc.airports()

                .then(function (result) {

                    /* filter airports */
                    var reply = {
                        airports: [],
                        routes: [] //TBD
                    };

                    reply.airports = result.airports
                        .map(function (airport) {
                            return {
                                name: airport.name,
                                code: airport.iataCode,
                                fullName: airport.name + ' ' + airport.iataCode
                            };
                        })
                        .filter(function (airport) {
                            return airport.fullName.match(predicate);
                        });

                    deferred.resolve(reply);

                }, deferred.reject);

                return deferred.promise;
            },

            getDestinations: function (origin) {
                // TBD...
            }
        };
}]);
