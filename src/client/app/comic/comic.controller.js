(function() {
  'use strict';

  angular
    .module('app.comic')
    .controller('ComicController', ComicController);

  ComicController.$inject = ['$q','logger', 'Api', '$stateParams', '$window', '$scope', '$translate'];
  /* @ngInject */
  function ComicController($q, logger, Api, $stateParams, $window, $scope, $translate) {
    var vm = this;
    vm.comic = [];
    vm.chapters = [];
    vm.downloadChapter = downloadChapter;
    vm.isTranslated = true;

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
          var translated = isTranslated();
          if (!translated) {
            vm.isTranslated = false;
          }
          else {
            vm.comic.description = translated;
            vm.isTranslated = true;
            vm.chapters = _.filter(data.chapters, function(o) { return o.chapter.language === $scope.selectLang;});
          }
          return vm.comic;
        })
        .catch(function(data) {
          logger.error(data);
        });
    }

    function isTranslated() {
      if (vm.comic.descriptions !== undefined && _.find(vm.comic.descriptions, { 'language': $scope.selectLang}) !== undefined) {
        return _.find(vm.comic.descriptions, { 'language': $scope.selectLang}).description;
      } else {
        return null;
      }
    }

    $scope.$watch('selectLang', function() {
      vm.selectLang = $translate.instant('global.settings.languages.' + $scope.selectLang);
      var translated = isTranslated();
      if (!translated) {
        vm.isTranslated = false;
      }
      else {
        vm.comic.description = translated;
        vm.isTranslated = true;
      }
    });
  }
})();
