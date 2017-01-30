'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams', 'RSVERSION',
      function ($rootScope,   $state,   $stateParams,   RSVERSION) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;   
          $rootScope.appVersion = RSVERSION.v;     
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 'RSVERSION',
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG, RSVERSION) {
            $urlRouterProvider
              .otherwise('/index');
          
          $stateProvider
              .state('index', {
                  url: '/index',
                  templateUrl: 'js/app/latest-releases/latest-releases.html?v=' + RSVERSION.v,
                  controller: 'LatestReleasesController',
                  controllerAs: 'vm',
                  resolve: load([
                      'js/app/latest-releases/latest-releases.controller.js?v=' + RSVERSION.v
                      ])
              })
              .state('list', {
                  url: '/list',
                  templateUrl: 'js/app/list/list.html?v=' + RSVERSION.v,
                  controller: 'ListSeriesController',
                  controllerAs: 'vm',
                  resolve: load([
                      'js/app/list/list.controller.js?v=' + RSVERSION.v
                      ])
              })
              .state('comic', {
                  url: '/comic/:id',
                  templateUrl: 'js/app/comic/comic.html?v=' + RSVERSION.v,
                  controller: 'ComicController',
                  controllerAs: 'vm',
                  resolve: load([
                      'js/app/comic/comic.controller.js?v=' + RSVERSION.v
                      ])
              });

          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        if(JQ_CONFIG[src]){
                          return $ocLazyLoad.load(JQ_CONFIG[src]);
                        }
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            name = module.name;
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }


      }
    ]
  );
