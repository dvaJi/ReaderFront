/* jshint -W117, -W030 */
describe('pages routes', function() {
  describe('state', function() {
    var view = 'app/pages/pages.html';

    beforeEach(function() {
      module('app.pages', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache', 'Restangular');
    });
  });
});
