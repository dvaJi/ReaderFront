/* jshint -W117, -W030 */
describe('ListController', function() {
  var controller;
  var releases = mockData.getMockReleases();

  beforeEach(function() {
    bard.appModule('app.list');
    bard.inject('$controller', '$log', '$q','$rootScope', 'Api', 'Restangular');
  });

});
