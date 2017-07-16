/* jshint -W117, -W030 */
describe('comic routes', function() {
  describe('state', function() {
    var view = 'app/comic/comic.html';

    beforeEach(function() {
      module('app.comic', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state comic to url / ', function() {
      expect($state.href('comic', {id: 'infection'})).to.equal('/comic/infection');
    });

    it('should map /comic route to comic View template', function() {
      expect($state.get('comic').templateUrl).to.equal(view);
    });

    it('of comic should work with $state.go', function() {
      $state.go('comic');
      $rootScope.$apply();
      expect($state.is('comic'));
    });
  });
});