/* jshint -W117, -W030 */
describe('ComicController', function() {
  var controller;
  var comic = mockData.getMockComics();

  beforeEach(function() {
    bard.appModule('app.comic');
    bard.inject('$controller', '$log', '$q','$rootScope', 'Api');
  });

  beforeEach(function() {
    sinon.stub(Api, 'getComic').returns($q.when(comic));
    controller = $controller('ComicController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Comic controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });
  });
});
