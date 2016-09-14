describe('myApp.results module', function() {
  'use strict';

  beforeEach(module('myApp.results'));

  describe('results module', function(){

    it('should validate controller existence', inject(function($controller) {
      var resultsCtrl = $controller('ResultsCtrl');
      expect(resultsCtrl).toBeDefined();
    }));

  });
});
