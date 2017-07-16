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

    bard.verifyNoOutstandingHttpRequests();

    it('should map state read to url / ', function() {
      var comic = {
        id: 'infection',
        lang: 'en',
        volume: 5,
        chapter: 36,
        subchapter: 0
      };
      expect($state.href('read', comic)).to.equal('/read/infection/en/5/36.0');
    });

    it('should map /read route to read View template', function() {
      expect($state.get('read').templateUrl).to.equal(view);
    });

    it('of read should work with $state.go', function() {
      $state.go('read');
      $rootScope.$apply();
      expect($state.is('read'));
    });
  });
});