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
    appErrorPrefix: '[App Error] ',
    appTitle: '<%= name %>'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider', 'RestangularProvider', '$locationProvider', '$translateProvider', 'CUSTOM_CONFIG'];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider, exceptionHandlerProvider, RestangularProvider, $locationProvider, $translateProvider, CUSTOM_CONFIG) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    $translateProvider.preferredLanguage(CUSTOM_CONFIG.LANG);
    $translateProvider.useLocalStorage();

    config.appTitle = CUSTOM_CONFIG.NAVTITLE;
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });

    //Configure REST
    RestangularProvider.setBaseUrl(CUSTOM_CONFIG.API.foolslideUrl);
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
