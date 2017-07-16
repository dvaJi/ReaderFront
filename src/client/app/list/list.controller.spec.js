/* jshint -W117, -W030 */
describe('ListController', function() {
  var controller;
  var scope;

  beforeEach(function() {
    bard.appModule('app.list');
    bard.inject('$controller', '$q','Api', '$localStorage', '$rootScope');
  });

  beforeEach(function() {
    scope = $rootScope.$new();
    controller = $controller('ListController', {$scope: scope});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('List controller', function() {
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