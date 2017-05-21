/* jshint -W117, -W030 */
describe('blog routes', function() {
  describe('state', function() {
    var view = 'app/blog/blog.html';

    beforeEach(function() {
      module('app.blog', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });
  });

});
