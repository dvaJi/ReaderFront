/* jshint -W117, -W030 */
describe('ComicController', function() {
  var controller;
  var comic = mockData.getMockComics();

  beforeEach(function() {
    bard.appModule('app.comic');
    bard.inject('$controller', '$log', '$q','$rootScope', 'Api');
  });

});
