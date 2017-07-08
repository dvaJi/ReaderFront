/* jshint -W117, -W030 */
describe('ProjectsController', function() {
  var controller;
  var comic = mockData.getMockComics();

  beforeEach(function() {
    bard.appModule('app.projects');
    bard.inject('$controller', '$log', '$q','$rootScope', 'Api');
  });

});
