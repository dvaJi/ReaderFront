/* jshint -W117, -W030 */
describe('releases routes', function() {
  describe('state', function() {
    var view = 'app/releases/releases.html';

    beforeEach(function() {
      module('app.releases', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

  });
});
