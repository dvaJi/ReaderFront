(function() {
  'use strict';

  angular
    .module('app.reader')
    .controller('ReaderController', ReaderController);

  ReaderController.$inject = ['$scope','$q','logger', 'Api', '$stateParams', 'hotkeys', '$location', '$anchorScroll', '$state', '$window', '$localStorage', 'CUSTOM_CONFIG'];
  /* @ngInject */
  function ReaderController($scope, $q, logger, Api, $stateParams, hotkeys, $location, $anchorScroll, $state, $window, $localStorage, CUSTOM_CONFIG) {
    var vm = this;
    vm.comic = [];
    vm.comics = [];
    vm.chapter = [];
    vm.chapters = [];
    vm.chaptersOneshots = [];
    vm.pages = [];
    vm.pagesList = [];
    vm.pageSelected = 1;
    var params = $stateParams;
    vm.chapterSelected = {chapter:params.chapter, subchapter:params.subchapter};
    vm.changePageSelected = changePageSelected;
    vm.changePageClick = changePageClick;
    vm.downloadChapter = downloadChapter;
    vm.changeWebtoonMode = changeWebtoonMode;
    vm.showImages = showImages;
    var lastPage = 0;
    var lastestChapter = 0;
    var chaptersList = [];
    var comicsList = [];
    vm.currentLang = window.localStorage.getItem('NG_TRANSLATE_LANG_KEY');

    loadReader();

    function loadReader() {
      vm.webtoonMode = false;
      if ($localStorage.filterLang !== undefined && vm.currentLang !== $localStorage.filterLang) {
        vm.currentLang = $localStorage.filterLang;
      } else if ($localStorage.filterLang === undefined) {
        $localStorage.filterLang = 'all';
      }
      var promises = [getComic(), getComics()];
      return $q.all(promises).then(function() {
        showNavInfo();
      });
    }

    function setDisqusConfig(name, chapter, subchapter, lang) {
      var langSub =  (lang === 'es') ? 'es_ES' : lang;
      var chapterObj = ((subchapter !== '0') ? chapter + '.' + subchapter : chapter);
      $scope.disqusConfig = {
        disqus_shortname: CUSTOM_CONFIG.DISQUS.disqus_shortname,
        disqus_identifier: CUSTOM_CONFIG.DISQUS.disqus_identifier + params.id + chapter + subchapter + lang.toUpperCase(),
        disqus_url: window.location.href,
        disqus_title: name + ' chapter ' + chapterObj  + ' ' + lang.toUpperCase() + ' - ' + CUSTOM_CONFIG.NAVTITLE,
        disqus_config_language: langSub,
        disqus_disable_mobile: 'false'
      };
    }

    function getComic() {
      var query = { stub: params.id, chapter: params.chapter, subchapter: params.subchapter, lang: params.lang };
      return Api.getComic(query)
        .then(function (data) {
          vm.comic = data.comic;
          angular.forEach(data.chapters, function (value, key) {

            if (value.chapter.chapter === params.chapter && value.chapter.subchapter === params.subchapter && value.chapter.language === params.lang) {
              vm.chapter = value.chapter;
            }

            if (vm.comic.name === 'Oneshots') {
              vm.chaptersOneshots.push(value.chapter.name);
            }

            var chapterObj = {chapter: value.chapter.chapter, subchapter:value.chapter.subchapter, lang: value.chapter.language};
            vm.chapters.push(chapterObj);
            if (parseInt(value.chapter.chapter) >= parseInt(lastestChapter)) {
              lastestChapter = parseInt(value.chapter.chapter);
            }
          });
          chaptersList = vm.chapters;
          vm.chapters = _.filter(vm.chapters, function(o) { return o.lang === window.localStorage.getItem('NG_TRANSLATE_LANG_KEY');});

          vm.pages = vm.chapter.pages;
          angular.forEach(vm.pages, function (value, key) {
            vm.pagesList.push(key + 1);
          });
          lastPage = vm.pages.length;
          setDisqusConfig(vm.comic.name, params.chapter, params.subchapter, vm.currentLang);
          return vm.comic;
        });
    }

    $scope.$watch(function() {
      if (vm.currentLang !== window.localStorage.getItem('NG_TRANSLATE_LANG_KEY')) {
        vm.currentLang = window.localStorage.getItem('NG_TRANSLATE_LANG_KEY');
        vm.chapters = _.filter(chaptersList, function(o) { return o.lang === vm.currentLang;});
        var newComics = [];
        _.forEach(comicsList, function(comic) {
          if (_.find(comic.languages, function(o) { return o === vm.currentLang; }) !== undefined) {
            newComics.push(comic);
          }
        });
        vm.comics = newComics;
      }
    });

    function getComics() {
      return Api.comicsList({per_page: 100})
       .then(function(data) {
          var newComics = [];
          vm.comics = data[0].comics;
          comicsList = vm.comics;
          _.forEach(comicsList, function(comic) {
            if (_.find(comic.languages, function(o) { return o === vm.currentLang; }) !== undefined) {
              newComics.push(comic);
            }
          });
          vm.comics = newComics;
          return vm.comics;
        });
    }

    function changePageSelected(page) {
      if (page === null || vm.pageSelected === lastPage) {
        vm.pageSelected = 'END';
      } else if (page <= 0) {
        vm.pageSelected = 1;
      } else {
        vm.pageSelected = page;
      }
      if (vm.webtoonMode && vm.pageSelected !== 'END') {
        $location.hash('page_' + (vm.pageSelected - 2));
      } else {
        $location.hash('topRead');
      }
      $anchorScroll();
    }

    function changePageClick(page) {
      if (vm.pageSelected === lastPage) {
        if (lastestChapter !== parseInt(vm.chapter.chapter)) {
          $state.go('read', {id: vm.comic.stub, chapter: parseInt(vm.chapter.chapter) + 1, subchapter: 0});
        } else {
          vm.pageSelected = 'END';
        }
      } else {
        vm.pageSelected = page + 2;
      }
      if (vm.webtoonMode) {
        $location.hash('page_' + (vm.pageSelected - 2));
      } else {
        $location.hash('topRead');
      }
      $anchorScroll();
    }

    function downloadChapter() {
      var url = vm.chapter.download_href;
      if (CUSTOM_CONFIG.API.adfly !== undefined) {
        url = CUSTOM_CONFIG.API.adfly + vm.chapter.download_href.replace(/^https?\:\/\//i, 'www.');
      }
      $window.open(url, '_blank');
    }

    function changeWebtoonMode() {
      if (vm.webtoonMode === true) {
        vm.webtoonMode = false;
      } else {
        vm.webtoonMode = true;
        $location.hash('page_' + (vm.pageSelected - 1));
        $anchorScroll();
      }
    }

    function showImages(value) {
      if (vm.webtoonMode || ((vm.pageSelected - 1) === value)) {
        return true;
      } else {
        return false;
      }
    }

    function showNavInfo() {
      if ($localStorage.navInfo === undefined || $localStorage.navInfo === null) {
        logger.info('Use W-A-S-D or the arrow keys to navigate');
        $localStorage.navInfo = true;
      }
    }

    // Hotkeys config
    hotkeys.add({
      combo: 'right',
      description: 'Next page',
      callback: function () {
        changePageSelected(vm.pageSelected !== 'END' ? (vm.pageSelected + 1) : null);
      }
    });
    hotkeys.add({
      combo: 'd',
      description: 'Next page',
      callback: function () {
        changePageSelected(vm.pageSelected !== 'END' ? (vm.pageSelected + 1) : null);
      }
    });
    hotkeys.add({
      combo: 'left',
      description: 'Previous page',
      callback: function () {
        changePageSelected(vm.pageSelected !== 'END' ? (vm.pageSelected - 1) : null);
      }
    });
    hotkeys.add({
      combo: 'a',
      description: 'Previous page',
      callback: function () {
        changePageSelected(vm.pageSelected !== 'END' ? (vm.pageSelected - 1) : null);
      }
    });
  }
})();
