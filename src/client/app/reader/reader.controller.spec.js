/* jshint -W117, -W030 */
describe('ReaderController', function() {
  var controller;
  var releases = mockData.getMockReleases();

  beforeEach(function() {
    bard.appModule('app.reader');
    bard.inject('$controller', '$log', '$q','$rootScope', 'Api', '$stateParams');
  });

});
