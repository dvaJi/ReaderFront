(function() {
  'use strict';

  angular
    .module('app.reader')
    .controller('ReaderController', ReaderController);

  ReaderController.$inject = ['$scope','$q','logger', 'Api', '$stateParams', 'hotkeys', '$location', '$anchorScroll', '$state', '$window', '$localStorage'];
  /* @ngInject */
  function ReaderController($scope, $q, logger, Api, $stateParams, hotkeys, $location, $anchorScroll, $state, $window, $localStorage) {
    var vm = this;
    vm.comic = [];
    vm.comics = [];
    vm.chapter = [];
    vm.chapters = [];
    vm.chaptersOneshots = [];
    vm.pages = [];
    vm.pagesList = [];
    vm.pageSelected = 1;
    vm.lastestChapter = 0;
    vm.params = $stateParams;
    vm.chapterSelected = vm.params.chapter;
    vm.lastPage = 0;
    vm.getComic = getComic;
    vm.getComics = getComics;
    vm.changePageSelected = changePageSelected;
    vm.changePageClick = changePageClick;
    vm.setDisqusConfig = setDisqusConfig;
    vm.downloadChapter = downloadChapter;
    vm.changeWebtoonMode = changeWebtoonMode;
    vm.showImages = showImages;

    loadReader();

    function loadReader() {
      vm.webtoonMode = false;
      var promises = [getComic(), getComics()];
      return $q.all(promises).then(function() {
        showNavInfo();
      });
    }

    function setDisqusConfig() {
      $scope.disqusConfig = {
        disqus_shortname: 'ravens-scans-english',
        disqus_identifier: 'RS_' + vm.params.id + '_' + vm.params.chapter,
        disqus_url: window.location.href,
        disqus_title: vm.comic.name + ' chapter ' + vm.chapter.chapter + ' - ' + $scope.siteName,
        disqus_disable_mobile: 'false'
      };
    }

    function getComic() {
      var query = {};
      if (typeof(vm.params.chapter) !== 'undefined' && vm.params.chapter.indexOf('.') !== -1) {
        query = { stub: vm.params.id, chapter: vm.params.chapter.split('.')[0], subchapter: vm.params.chapter.split('.')[1] };
      } else {
        query = { stub: vm.params.id, chapter: vm.params.chapter };
      }
      return Api.getComic(query)
        .then(function (data) {
          vm.comic = data.comic;
          angular.forEach(data.chapters, function (value, key) {
            if (vm.params.chapter.indexOf('.') !== -1) {
              if (value.chapter.chapter === vm.params.chapter.split('.')[0] && value.chapter.subchapter === vm.params.chapter.split('.')[1]) {
                vm.chapter = value.chapter;
              }
            } else {
              if (value.chapter.chapter === vm.chapterSelected && value.chapter.subchapter === '0') {
                vm.chapter = value.chapter;
              }
            }
            if (vm.comic.name === 'Oneshots') {
              vm.chaptersOneshots.push(value.chapter.name);
            }
            if (value.chapter.subchapter !== null && value.chapter.subchapter !== '0') {
              vm.chapters.push(value.chapter.chapter + '.' + value.chapter.subchapter);
            } else {
              vm.chapters.push(value.chapter.chapter);
            }
            if (parseInt(value.chapter.chapter) >= parseInt(vm.lastestChapter)) {
              vm.lastestChapter = parseInt(value.chapter.chapter);
            }
          });
          vm.pages = vm.chapter.pages;
          angular.forEach(vm.pages, function (value, key) {
            vm.pagesList.push(key + 1);
          });
          vm.lastPage = vm.pages.length;
          setDisqusConfig();
          return vm.comic;
        });
    }

    function getComics() {
      return Api.comicsList()
       .then(function(data) {
          vm.comics = data[0].comics;
          return vm.comics;
        });
    }

    function changePageSelected(page) {
      if (page === null || vm.pageSelected === vm.lastPage) {
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
      if (vm.pageSelected === vm.lastPage) {
        if (vm.lastestChapter !== parseInt(vm.chapter.chapter)) {
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
      $window.open(vm.chapter.download_href, '_blank');
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

    function showNavInfo() {
      if ($localStorage.navInfo === undefined || $localStorage.navInfo === null) {
        logger.info('Use W-A-S-D or the arrow keys to navigate');
        $localStorage.navInfo = true;
      }
    }
  }
})();
