angular.module('myApp.api', [])

.factory('ApiSvc', [ '$http', '$q', function ($http, $q) {
    'use strict';

    var IATA = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/';
    var CHEAP_FLIGHTS = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/%origin%/to/%dest%/%start%/%end%/250/unique/?limit=15&offset-0';

    var ERROR = {
        INVALID_DATA: 'INVALID_DATA'
    };

    function isValidInput(from, to) {
        if (!from || !to) {
            return false;
        }
        //TBD...
        return true;
    }

    return {

        errorCodes: function () {
            return angular.copy(ERROR);
        },

        airports: function () {
            var deferred = $q.defer();

            $http.get(IATA)
                .then(function successCb(result) {
                    console.log('Got airport results! :)');

                    deferred.resolve({
                        airports: result.data.airports,
                        routes: result.data.routes
                    });

                }, function errorCb(error) {
                    console.error('Error getting results:', error);
                    deferred.reject(error);
                });

            return deferred.promise;
        },

        cheapFlights: function (from, to, start, end) {
            var deferred = $q.defer();

            if(!isValidInput(from, to)) {
                deferred.reject(ERROR.INVALID_DATA);
                return deferred.promise;
            }

            /* comstruct url */
            var url = CHEAP_FLIGHTS
                .replace('%origin%', from)
                .replace('%dest%', to)
                .replace('%start%', start)
                .replace('%end%', end);

            $http.get(url)
                .then(function successCb(result) {
                    console.log('Got cheap flight results! :)');
                    deferred.resolve(result.data);
                }, function errorCb(error) {
                    console.error('Error getting results:', error);
                    deferred.reject(error);
                });

            return deferred.promise;
        }

    };

}]);