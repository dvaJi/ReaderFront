(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize', 'ngCookies', 'ngTouch',
      'blocks.exception', 'blocks.logger', 'blocks.router',
      'ui.router', 'ngplus','restangular', 'cfp.hotkeys',
      'ngStorage', 'pascalprecht.translate', 'ui.bootstrap'
    ]);
})();
