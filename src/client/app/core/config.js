(function () {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[readerFront Error] ',
    appTitle: 'readerFront'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider', 'RestangularProvider', '$locationProvider'];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider, RestangularProvider, $locationProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });

    //Configure REST
    RestangularProvider.setBaseUrl('http://localhost/FoOlSlide/api/v1/');
    RestangularProvider.addResponseInterceptor(parseApiResponse);
    RestangularProvider.setDefaultHttpFields({ AcceptuseXDomain: true, withCredentials: true });
    RestangularProvider.setDefaultHeaders({
      'X-Requested-With': 'XMLHttpRequest'
    });

    function parseApiResponse(data, operation) {
      var extractedData;
      if (operation === 'getList') {
        extractedData = data.data;
      } else {
        extractedData = data;
      }
      return extractedData;
    }
  }

})();
