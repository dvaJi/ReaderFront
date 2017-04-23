/* jshint -W117, -W030 */
describe('reader routes', function() {
  describe('state', function() {
    var view = 'app/reader/reader.html';

    beforeEach(function() {
      module('app.reader', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });
  });

});
