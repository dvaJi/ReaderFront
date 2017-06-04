(function() {
  'use strict';

  angular
    .module('app.pages')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'pages',
        config: {
          url: '/page/:stub',
          templateUrl: 'app/pages/pages.html',
          controller: 'PagesController',
          controllerAs: 'vm',
          title: 'pages',
          settings: {
            nav: 0,
            content: '<i class="fa fa-th-pages"></i> pages'
          }
        }
      }
    ];
  }
})();
