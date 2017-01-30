// config

var app =  
angular.module('app')
    .constant("RSVERSION", {
        "v": "0.2",
        "READER_PATH": "reader/",
        "API_URL": "api/reader/"
    })
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }])
  .config(
    [        'RestangularProvider', '$locationProvider', 'RSVERSION',
    function (RestangularProvider, $locationProvider, RSVERSION) {
      RestangularProvider.setBaseUrl(RSVERSION.READER_PATH + RSVERSION.API_URL);
      RestangularProvider.addResponseInterceptor(parseApiResponse);
      RestangularProvider.setDefaultHttpFields({AcceptuseXDomain:true,withCredentials: true});
      RestangularProvider.setDefaultHeaders({
          "X-Requested-With": "XMLHttpRequest"
      });

      function parseApiResponse(data, operation, what, url, response, deferred) {
          var extractedData;
          if (operation === "getList") {
            //console.log(data.data);
            extractedData = data.data;
          } else {
            //console.log(data);
            extractedData = data;
          }
          return extractedData;
      }

      //$locationProvider.hashPrefix('!');
      //$locationProvider.html5Mode(true);
    }
  ]);