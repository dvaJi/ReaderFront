(function() {
  'use strict';

  angular
    .module('app.list')
    .controller('ListController', ListController);

  ListController.$inject = ['$q','Api','logger', '$timeout', '$localStorage', '$scope'];
  /* @ngInject */
  function ListController($q, Api, logger, $timeout, $localStorage, $scope) {
    var vm = this;
    vm.comics = [];
    vm.loading = true;
    vm.currentLang = 'all';
    vm.changeLanguage = changeLanguage;
    var comicsList = [];

    loadChapters();

    function loadChapters() {
      if ($localStorage.filterLang !== undefined && vm.currentLang !== $localStorage.filterLang) {
        vm.currentLang = $localStorage.filterLang;
      } else if ($localStorage.filterLang === undefined) {
        $localStorage.filterLang = 'all';
      }
      var promises = [getComics({orderby:'asc_name', per_page: 100})];
      return $q.all(promises).then(function() {
        vm.loading = false;
        //logger.info('Activated List View');
      });
    }

    function getComics(query) {
      return Api.comicsList(query)
        .then(function(data) {
          comicsList = data[0];
          vm.comics = comicsFilter(comicsList.comics);
          return vm.comics;
        })
        .catch(function(data) {
          logger.error(data);
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
      var promise = $timeout();
      promise = promise.then(function() {
        vm.comics = comicsFilter(comicsList.comics);
        return $timeout(1);
      });
    }

    function comicsFilter(comics) {
      var newComics = [];
      if (vm.currentLang === 'all') {
        return comicsList.comics;
      }
      _.forEach(comics, function(comic) {
        if (_.find(comic.languages, function(o) { return o === vm.currentLang; }) !== undefined) {
          newComics.push(comic);
        }
      });
      return newComics;
    }
  }
})();
