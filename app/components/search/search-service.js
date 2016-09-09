angular.module('myApp.search.service', [])

.factory('SearchSvc', [ '$q', function ($q) {
	return {
		getOrigins: function () {
			var deferred = $q.defer();

			// simulate for now
			setTimeout(function() {
				deferred.resolve([]);
			}, 1000);

			return deferred.promise;
		},

		getDestinations: function (origin) {
			// TBD...
		}
	};
}]);
