/* jshint -W117, -W030 */
describe('PagesController', function() {
  var controller;
  var releases = mockData.getMockReleases();

  beforeEach(function() {
    bard.appModule('app.pages');
    bard.inject('$controller', '$log', '$q','$rootScope', 'Api', 'Restangular');
  });

});
