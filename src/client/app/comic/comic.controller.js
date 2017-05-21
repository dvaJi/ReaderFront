(function() {
  'use strict';

  angular
    .module('app.comic')
    .controller('ComicController', ComicController);

  ComicController.$inject = ['$q','logger', 'Api', '$stateParams', '$window'];
  /* @ngInject */
  function ComicController($q, logger, Api, $stateParams, $window) {
    var vm = this;
    vm.getComic = getComic;
    vm.comic = [];
    vm.chapters = [];
    vm.downloadChapter = downloadChapter;

    loadComic();

    function loadComic() {
      var promises = [getComic()];
      return $q.all(promises).then(function() {
        //logger.info('Activated Comic View');
      });
    }

    function downloadChapter(url) {
      $window.open(url, '_blank');
    }

    function getComic() {
      return Api.getComic({stub:$stateParams.id})
        .then(function(data) {
          vm.comic = data.comic;
          vm.chapters = data.chapters;
          return vm.comic;
        })
        .catch(function(data) {
          logger.error(data);
        });
    }
  }
})();
