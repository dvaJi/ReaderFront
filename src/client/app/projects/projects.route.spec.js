/* jshint -W117, -W030 */
describe('projects routes', function() {
  describe('state', function() {
    var view = 'app/projects/projects.html';

    beforeEach(function() {
      module('app.projects', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache', 'Restangular');
    });
  });
});
