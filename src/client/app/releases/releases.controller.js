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
    vm.loading = true;
    vm.loadMore = loadMore;
    var itemsPerPage = 8;
    var currentPage = 1;
    var chaptersLimit = false;

    loadChapters();

    function loadChapters() {
      var promises = [getReleases()];
      return $q.all(promises).then(function() {
        vm.loading = false;
        //logger.info('Activated Releases View');
      });
    }

    function getReleases(page) {
      return Api.latestChapters({per_page:itemsPerPage,page:page,orderby:'desc_created'})
        .then(function(data) {
          if (data[0].chapters.length < 0) {
            chaptersLimit = true;
          }
          vm.releases = vm.releases.concat(data[0].chapters);
          return vm.releases;
        })
        .catch(function(data) {
          logger.error(data);
        });
    }

    function loadMore() {
      if (!chaptersLimit) {
        currentPage = currentPage + 1;
        getReleases(currentPage);
      }
    }
  }
})();

