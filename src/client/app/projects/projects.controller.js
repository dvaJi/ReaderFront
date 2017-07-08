(function() {
  'use strict';

  angular
    .module('app.projects')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['$q','logger', 'Api', '$stateParams', '$window'];
  /* @ngInject */
  function ProjectsController($q, logger, Api, $stateParams, $window) {
    var vm = this;
    vm.getComic = getComic;
    vm.comic = [];
    vm.chapters = [];

    loadProjects();

    function loadProjects() {
      var promises = [getComic()];
      return $q.all(promises).then(function() {
        //logger.info('Activated Comic View');
      });
    }

    function getComic() {
      return Api.getProjectsBoard()
        .then(function(data) {
          console.log(data);
        })
        .catch(function(data) {
          logger.error(data);
        });
    }
  }
})();
