angular.module('myApp.search.controller', ['myApp.search.service'])

.controller('SearchCtrl', ['SearchSvc', function(SearchSvc) {
	var self = this;

	self.flight = {
		origin: null,
		destination: null,
		dateStart: null,
		dateEnd: null
	};

	self.go = function () {
		console.log(self.form);
		SearchSvc.getOrigins().then(function(result) {
			console.log('Results', result);
		});
	};
}]);
