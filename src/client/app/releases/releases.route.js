(function() {
  'use strict';

  angular
    .module('app.releases')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'releases',
        config: {
          url: '/',
          templateUrl: 'app/releases/releases.html',
          controller: 'ReleasesController',
          controllerAs: 'vm',
          title: 'Releases',
          settings: {
            nav: 1,
            content: '<i class="fa fa-archive"></i> Releases'
          }
        }
      }
    ];
  }
})();
