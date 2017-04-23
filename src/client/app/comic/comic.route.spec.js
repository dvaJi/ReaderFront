/* jshint -W117, -W030 */
describe('comic routes', function() {
  describe('state', function() {
    var view = 'app/comic/comic.html';

    beforeEach(function() {
      module('app.comic', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache', 'Restangular');
    });
  });
});
