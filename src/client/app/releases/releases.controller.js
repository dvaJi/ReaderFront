(function() {
  'use strict';

  angular
    .module('app.releases')
    .controller('ReleasesController', ReleasesController);

  ReleasesController.$inject = ['$q','Api', 'logger', '$localStorage', '$scope', '$translate'];
  /* @ngInject */
  function ReleasesController($q, Api, logger, $localStorage, $scope, $translate) {
    var vm = this;
    vm.releases = [];
    vm.loading = true;
    vm.loadMore = loadMore;
    vm.changeLanguage = changeLanguage;
    var itemsPerPage = 20;
    vm.currentLang = 'all';
    var currentPage = 1;
    var chaptersLimit = false;

    loadChapters();

    function loadChapters() {
      if ($localStorage.filterLang !== undefined && vm.currentLang !== $localStorage.filterLang) {
        vm.currentLang = $localStorage.filterLang;
      } else if ($localStorage.filterLang === undefined) {
        $localStorage.filterLang = 'all';
      }
      var query = getQuery(itemsPerPage, currentPage);
      var promises = [getReleases(query)];
      return $q.all(promises).then(function () {
        vm.loading = false;
        //logger.info('Activated Releases View');
      });
    }

    function getReleases(query) {
      return Api.latestChapters(query)
        .then(function(data) {
          vm.releases = data[0].chapters;
          return vm.releases;
        })
        .catch(function(data) {
          if (data.status === 404) {
            vm.releases = null;
            logger.warning($translate.instant('global.NO_MORE_CHAPTERS'));
          } else {
            logger.error(data);
          }
        });
    }

    function pushReleases(query) {
      return Api.latestChapters(query)
        .then(function (data) {
          if (data[0].chapters.length < 0) {
            chaptersLimit = true;
          }
          vm.releases = vm.releases.concat(data[0].chapters);
          return vm.releases;
        })
        .catch(function (data) {
          if (data.status === 404 && query.page > 1) {
            logger.warning('No more chapters!');
          } else {
            logger.error(data);
          }
        });
    }

    $scope.$watch(function() {
      if (!vm.loading && vm.currentLang !== window.localStorage.getItem('NG_TRANSLATE_LANG_KEY')) {
        changeLanguage(window.localStorage.getItem('NG_TRANSLATE_LANG_KEY'));
      }
    });

    function changeLanguage(lang) {
      vm.currentLang = lang;
      $localStorage.filterLang = lang;
      currentPage = 1;
      var query = getQuery(itemsPerPage, currentPage);
      getReleases(query);
    }

    function loadMore() {
      if (!chaptersLimit) {
        currentPage = currentPage + 1;
        var query = getQuery(itemsPerPage, currentPage);
        pushReleases(query);
      }
    }

    function getQuery(itemsPerPage, currentPage) {
      if (vm.currentLang !== 'all') {
        return { per_page: itemsPerPage, page: currentPage, orderby: 'desc_created', lang: vm.currentLang };
      } else {
        return { per_page: itemsPerPage, page: currentPage, orderby: 'desc_created' };
      }
    }
  }
})();

