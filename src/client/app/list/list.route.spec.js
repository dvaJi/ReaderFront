/* jshint -W117, -W030 */
describe('list routes', function() {
  describe('state', function() {
    var view = 'app/list/list.html';

    beforeEach(function() {
      module('app.list', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache', 'Restangular');
    });
  });
});
