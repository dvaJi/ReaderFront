/* jshint -W117, -W030 */
describe('layout', function() {
  describe('sidebar', function() {
    var controller;
    var views = {
      comic: 'app/comic/comic.html',
      list: 'app/list/list.html'
    };

    beforeEach(function() {
      module('app.layout', bard.fakeToastr);
      bard.inject('$controller', '$httpBackend', '$location',
        '$rootScope', '$state', 'routerHelper', 'Restangular');
    });
  });
});
