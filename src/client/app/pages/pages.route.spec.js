/* jshint -W117, -W030 */
describe('pages routes', function() {
  describe('state', function() {
    var view = 'app/pages/pages.html';

    beforeEach(function() {
      module('app.pages', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state pages to url / ', function() {
      expect($state.href('pages', {})).to.equal('/page/');
    });

    it('should map /pages route to pages View template', function() {
      expect($state.get('pages').templateUrl).to.equal(view);
    });

    it('of pages should work with $state.go', function() {
      $state.go('pages');
      $rootScope.$apply();
      expect($state.is('pages'));
    });
  });
});