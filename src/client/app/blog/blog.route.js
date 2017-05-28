(function() {
  'use strict';

  angular
    .module('app.blog')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'blog',
        config: {
          abstract: true,
          template: '<ui-view/>',
          title: 'Blog',
          settings: {
            nav: 0,
            content: '<i class="fa fa-newspaper-o></i> Blog'
          }
        }
      },
      {
        state: 'blog.all',
        config: {
          url: '/blog',
          templateUrl: 'app/blog/blog.html',
          controller: 'BlogController',
          controllerAs: 'vm',
          title: 'Blog',
          settings: {
            nav: 3,
            content: '<i class="fa fa-newspaper-o"></i> Blog'
          }
        }
      },
      {
        state: 'blog.posts',
        config: {
          url: '/blog/post/:stub',
          templateUrl: 'app/blog/post.html',
          controller: 'BlogController',
          controllerAs: 'vm',
          title: 'Blog',
          settings: {
            nav: 0,
            content: '<i class="fa fa-newspaper-o"></i> Blog'
          }
        }
      }
    ];
  }
})();
