(function() {
  'use strict';

  angular
    .module('app.list')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'list',
        config: {
          url: '/list',
          templateUrl: 'app/list/list.html',
          controller: 'ListController',
          controllerAs: 'vm',
          title: 'list',
          settings: {
            nav: 2,
            content: '<i class="fa fa-th-list"></i> List'
          }
        }
      }
    ];
  }
})();
