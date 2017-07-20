/* jshint -W117, -W030 */
describe('BlogController', function() {
  var controller;
  var scope;

  beforeEach(function() {
    bard.appModule('app.blog');
    bard.inject('$controller', '$q','Api', '$localStorage', '$rootScope');
  });

  beforeEach(function() {
    scope = $rootScope.$new();
    controller = $controller('BlogController', {$scope: scope});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Blog controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      /* TODO
      it('should have news', function() {
        expect(controller.comics).to.not.be.empty;
      }); */
    });
  });
});
