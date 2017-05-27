(function() {
  'use strict';

  angular
    .module('app.releases')
    .controller('ReleasesController', ReleasesController);

  ReleasesController.$inject = ['$q','Api', 'logger'];
  /* @ngInject */
  function ReleasesController($q, Api, logger) {
    var vm = this;
    vm.releases = [];
    vm.getReleases = getReleases;
    vm.loadChapters = loadChapters;
    vm.loading = true;
    var itemsPerPage = 8;

    loadChapters();

    function loadChapters() {
      var promises = [getReleases()];
      return $q.all(promises).then(function() {
        vm.loading = false;
        //logger.info('Activated Releases View');
      });
    }

    function getReleases() {
      return Api.latestChapters({per_page:itemsPerPage,orderby:'desc_created'})
        .then(function(data) {
          vm.releases = data[0].chapters;
          return vm.releases;
        })
        .catch(function(data) {
          logger.error(data);
        });
    }
  }
})();

