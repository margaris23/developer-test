describe('myApp.search.controller module', function() {
  'use strict';

  beforeEach(module('myApp.search.controller'));

  describe('search controller', function(){

    it('should have empty flight data', inject(function($controller) {
      var searchCtrl = $controller('SearchCtrl');
      expect(searchCtrl.flight.origin).toBeNull();
      expect(searchCtrl.flight.destination).toBeNull();
      expect(searchCtrl.flight.dateStart).toBeNull();
      expect(searchCtrl.flight.dateEnd).toBeNull();
    }));

    it('should have default dateForm', inject(function($controller) {
      var searchCtrl = $controller('SearchCtrl');
      expect(searchCtrl.dateFormat).toEqual('yyyy-MM-dd');
    }));

    describe('should provide errors', function() {
        it('when origin is null', inject(function($controller) {
            var searchCtrl = $controller('SearchCtrl');
            searchCtrl.go();
            expect(searchCtrl.error.origin).not.toBeNull();
        }));

        it('when destination is null', inject(function($controller) {
            var searchCtrl = $controller('SearchCtrl');
            searchCtrl.flight.origin = {
                selected: {
                    code: 'ATH'
                }
            };
            searchCtrl.go();
            expect(searchCtrl.error.destination).not.toBeNull();
        }));

        it('when start date is null', inject(function($controller) {
            var searchCtrl = $controller('SearchCtrl');
            searchCtrl.flight.origin = {
                selected: {
                    code: 'ATH'
                }
            };
            searchCtrl.flight.destination = {
                selected: {
                    code: 'SKG'
                }
            };
            searchCtrl.go();
            expect(searchCtrl.error.dateStart).not.toBeNull();
        }));

        it('when end date is null', inject(function($controller) {
            var searchCtrl = $controller('SearchCtrl');
            searchCtrl.flight.origin = {
                selected: {
                    code: 'ATH'
                }
            };
            searchCtrl.flight.destination = {
                selected: {
                    code: 'SKG'
                }
            };
            searchCtrl.flight.dateStart = '2016-09-11';
            searchCtrl.go();
            expect(searchCtrl.error.dateEnd).not.toBeNull();
        }));

    });

    it('should succeed calling location service', inject(function($controller, _$location_) {
        var searchCtrl = $controller('SearchCtrl');
        spyOn(_$location_, 'path').and.callThrough();
        searchCtrl.flight.origin = {
            selected: {
                code: 'ATH'
            }
        };
        searchCtrl.flight.destination = {
            selected: {
                code: 'SKG'
            }
        };
        searchCtrl.flight.dateStart = '2016-09-11';
        searchCtrl.flight.dateEnd = '2016-09-11';
        searchCtrl.go();
        expect(_$location_.path).toHaveBeenCalled();
    }));

  });
});
