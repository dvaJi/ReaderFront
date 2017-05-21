/* jshint -W117, -W030 */
describe('BlogController', function() {
  var controller;
  var releases = mockData.getMockReleases();

  beforeEach(function() {
    bard.appModule('app.blog');
    bard.inject('$controller', '$log', '$q','$rootScope', 'Api', '$stateParams');
  });

});
