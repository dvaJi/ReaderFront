/* jshint -W117, -W030 */
describe('blog routes', function() {
  describe('state', function() {
    var view = 'app/blog/blog.html';

    beforeEach(function() {
      module('app.blog', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state blog to url / ', function() {
      expect($state.href('blog.all', {})).to.equal('/blog');
    });

    it('should map /blog.all route to blog View template', function() {
      expect($state.get('blog.all').templateUrl).to.equal(view);
    });

    it('of blog should work with $state.go', function() {
      $state.go('blog.all');
      $rootScope.$apply();
      expect($state.is('blog.all'));
    });

    it('params should work for blog.posts', function() {
      $state.go('blog.posts', {stub: 'something'});
      $rootScope.$apply();
      expect($state.is('blog.posts'));
    });
  });
});