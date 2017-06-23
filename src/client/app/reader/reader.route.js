(function() {
  'use strict';

  angular
    .module('app.reader')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'read',
        config: {
          url: '/read/:id/:lang/:volume/:chapter.:subchapter',
          templateUrl: 'app/reader/reader.html',
          controller: 'ReaderController',
          controllerAs: 'vm',
          title: 'Reader',
          settings: {
            nav: 0,
            content: '<i class="fa fa-lock"></i> Comic'
          }
        }
      }
    ];
  }
})();
