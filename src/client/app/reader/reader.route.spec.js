/* jshint -W117, -W030 */
describe('reader routes', function() {
  describe('state', function() {
    var view = 'app/reader/reader.html';

    beforeEach(function() {
      module('app.reader', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state reader to url /read/ ', function() {
      expect($state.href('read', {id:'chrono',chapter:22,subchapter:0})).to.equal('/read/chrono/chapter/22.0');
    });

    it('should map /reader route to reader View template', function() {
      expect($state.get('read').templateUrl).to.equal(view);
    });

    it('of reader should work with $state.go', function() {
      $state.go('read');
      $rootScope.$apply();
      expect($state.is('read'));
    });
  });
});
