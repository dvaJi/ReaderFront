/* jshint -W117, -W030 */
describe('releases routes', function() {
  describe('state', function() {
    var view = 'app/releases/releases.html';

    beforeEach(function() {
      module('app.releases', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state Releases to url / ', function() {
      expect($state.href('releases', {})).to.equal('/');
    });

    it('should map /releases route to releases View template', function() {
      expect($state.get('releases').templateUrl).to.equal(view);
    });

    it('of releases should work with $state.go', function() {
      $state.go('releases');
      $rootScope.$apply();
      expect($state.is('releases'));
    });
  });
});
