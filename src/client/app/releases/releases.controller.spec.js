/* jshint -W117, -W030 */
describe('AdminController', function() {
  var controller;
  var releases = mockData.getMockReleases();

  beforeEach(function() {
    bard.appModule('app.releases');
    bard.inject('$controller', '$log', '$q','$rootScope', 'Api');
  });

  beforeEach(function() {
    sinon.stub(Api, 'latestChapters').returns($q.when(releases));
    controller = $controller('ReleasesController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Releases controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });
  });
});
