(function() {
  'use strict';

  angular
    .module('app.comic')
    .controller('ComicController', ComicController);

  ComicController.$inject = ['$q','logger', 'Api', '$stateParams', '$window', '$scope', '$translate'];
  /* @ngInject */
  function ComicController($q, logger, Api, $stateParams, $window, $scope, $translate) {
    var vm = this;
    var chaptersList = [];
    vm.loading = true;
    vm.comic = [];
    vm.chapters = [];
    vm.downloadChapter = downloadChapter;
    vm.isTranslated = true;
    vm.totalItems = -1;
    vm.currentPage = 1;

    loadComic();

    function loadComic() {
      var promises = [getComic()];
      return $q.all(promises).then(function() {
        vm.loading = false;
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
            chaptersList = data.chapters;
            vm.chapters = _.filter(data.chapters, function(o) { return o.chapter.language === window.localStorage.getItem('NG_TRANSLATE_LANG_KEY');});
            vm.totalItems = vm.chapters.length;
          }
          return vm.comic;
        })
        .catch(function(data) {
          logger.error(data);
        });
    }

    function isTranslated() {
      if (vm.comic.descriptions !== undefined && _.find(vm.comic.descriptions, { 'language': window.localStorage.getItem('NG_TRANSLATE_LANG_KEY')}) !== undefined) {
        return _.find(vm.comic.descriptions, { 'language': window.localStorage.getItem('NG_TRANSLATE_LANG_KEY')}).description;
      } else {
        return null;
      }
    }

    $scope.$watch(function() {
      if (!vm.loading) {
        vm.selectLang = $translate.instant('global.settings.languages.' + window.localStorage.getItem('NG_TRANSLATE_LANG_KEY'));
        var translated = isTranslated();
        if (!translated) {
          vm.isTranslated = false;
        }
        else {
          vm.comic.description = translated;
          vm.chapters = _.filter(chaptersList, function(o) { return o.chapter.language === window.localStorage.getItem('NG_TRANSLATE_LANG_KEY');});
          vm.totalItems = vm.chapters.length;
          vm.isTranslated = true;
        }
      }
    });
  }
})();
