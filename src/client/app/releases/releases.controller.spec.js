/* jshint -W117, -W030 */
describe('AdminController', function() {
  var controller;
  var releases = mockData.getMockReleases();

  beforeEach(function() {
    bard.appModule('app.releases');
    bard.inject('$controller', '$log', '$q','$rootScope', 'Api');
  });

});
