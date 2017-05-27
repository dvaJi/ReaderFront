(function() {
  'use strict';

  angular
    .module('app.list')
    .controller('ListController', ListController);

  ListController.$inject = ['$q','Api','logger'];
  /* @ngInject */
  function ListController($q, Api, logger) {
    var vm = this;
    vm.getComics = getComics;
    vm.comics = [];
    vm.loading = true;

    loadChapters();

    function loadChapters() {
      var promises = [getComics()];
      return $q.all(promises).then(function() {
        vm.loading = false;
        //logger.info('Activated List View');
      });
    }

    function getComics() {
      return Api.comicsList({orderby:'asc_name'})
        .then(function(data) {
          vm.comics = data[0].comics;
          return vm.comics;
        })
        .catch(function(data) {
          logger.error(data);
        });
    }
  }
})();
