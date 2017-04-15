/* jshint -W117, -W030 */
describe('ListController', function() {
  var controller;
  var releases = mockData.getMockReleases();

  beforeEach(function() {
    bard.appModule('app.list');
    bard.inject('$controller', '$log', '$q','$rootScope', 'Api');
  });

  beforeEach(function() {
    sinon.stub(Api, 'comicsList').returns($q.when(releases));
    controller = $controller('ListController');
    $rootScope.$apply();
  });

  //bard.verifyNoOutstandingHttpRequests();

  describe('List controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

  });
});
