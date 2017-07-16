/* jshint -W117, -W030 */
describe('list routes', function() {
  describe('state', function() {
    var view = 'app/list/list.html';

    beforeEach(function() {
      module('app.list', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state list to url / ', function() {
      expect($state.href('list', {})).to.equal('/list');
    });

    it('should map /list route to list View template', function() {
      expect($state.get('list').templateUrl).to.equal(view);
    });

    it('of list should work with $state.go', function() {
      $state.go('list');
      $rootScope.$apply();
      expect($state.is('list'));
    });
  });
});