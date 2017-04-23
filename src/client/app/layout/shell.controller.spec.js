/* jshint -W117, -W030 */
describe('ShellController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.layout');
    bard.inject('$controller', '$q', '$rootScope', '$timeout', 'Restangular');
  });
});
