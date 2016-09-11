describe('myApp.search module', function() {
  'use strict';

  beforeEach(module('myApp.search'));

  describe('search module', function(){

    it('should validate controller existence', inject(function($controller) {
      var searchCtrl = $controller('SearchCtrl');
      expect(searchCtrl).toBeDefined();
    }));

  });
});
