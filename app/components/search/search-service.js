angular.module('myApp.search.service', [ 'myApp.api' ])

.factory('SearchSvc', [
    '$q',
    '$cacheFactory',
    'ApiSvc',

    function ($q, $cacheFactory, ApiSvc) {

        function _createAirportObject(airport) {
            return {
                name: airport.name,
                code: airport.iataCode,
                fullName: airport.name + ' (' + airport.iataCode + ')'
            };
        }

        return {
            getOrigins: function (predicate) {
                var deferred = $q.defer();

                 ApiSvc.airports()
                    .then(function (result) {
                        var reply = {
                            airports: []
                        };

                        reply.airports = result.airports
                            .map(_createAirportObject)
                            .filter(function matcher (airport) {
                                return airport.fullName.match(predicate);
                            });

                        deferred.resolve(reply);
                    }, deferred.reject);

                return deferred.promise;
            },

            getDestinations: function (origin) {
                var deferred = $q.defer();

                if (!origin || origin.length !== 3) {
                    return deferred.reject('invalid origin');
                }

                var reply = {
                    routes: []
                };

                ApiSvc.airports()
                    .then(function (result) {
                        /* get available routes, stringified for search */
                        var routes = (result.routes[origin] || []).toString();

                        /* reply in case of empty */
                        if(!routes) {
                            return deferred.resolve([]);
                        }

                        /* get destination airports data */
                        for (var i = 0; i < result.airports.length; i++) {
                            var airport = result.airports[i];
                            if(routes.indexOf(airport.iataCode) > -1) {
                                reply.routes.push(_createAirportObject(airport));
                            }
                        }

                        deferred.resolve(reply);
                    }, deferred.reject);

                return deferred.promise;
            }
        };
}]);
