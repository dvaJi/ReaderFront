'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
            $urlRouterProvider
              .otherwise('/index');
          
          $stateProvider
              .state('index', {
                  url: '/index',
                  templateUrl: 'js/app/latest-releases/latest-releases.html',
                  controller: 'LatestReleasesController',
                  controllerAs: 'vm',
                  resolve: load([
                      'js/app/latest-releases/latest-releases.factory.js', 
                      'js/app/latest-releases/latest-releases.controller.js'
                      ])
              })
              .state('list', {
                  url: '/list',
                  templateUrl: 'js/app/list/list.html',
                  controller: 'ListSeriesController',
                  controllerAs: 'vm',
                  resolve: load([
                      'js/app/list/list.factory.js', 
                      'js/app/list/list.controller.js'
                      ])
              })
              .state('comic', {
                  url: '/comic/:id',
                  templateUrl: 'js/app/comic/comic.html',
                  controller: 'ComicController',
                  controllerAs: 'vm',
                  resolve: load([
                      'js/app/comic/comic.factory.js', 
                      'js/app/comic/comic.controller.js'
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
