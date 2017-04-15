(function() {
  'use strict';

  angular
    .module('app.comic')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'comic',
        config: {
          url: '/comic/:id',
          templateUrl: 'app/comic/comic.html',
          controller: 'ComicController',
          controllerAs: 'vm',
          title: 'Comic',
          settings: {
            nav: 0,
            content: '<i class="fa fa-lock"></i> Comic'
          }
        }
      }
    ];
  }
})();
