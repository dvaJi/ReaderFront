(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$scope','$rootScope', '$timeout', 'config', 'logger', '$translate', '$localStorage', '$window', 'CUSTOM_CONFIG'];
  /* @ngInject */
  function ShellController($scope, $rootScope, $timeout, config, logger, $translate,   $localStorage,   $window, CUSTOM_CONFIG) {
    var vm = this;
    vm.busyMessage = 'Please wait ...';
    vm.isBusy = true;
    $rootScope.showSplash = true;
    vm.navline = { title: config.appTitle};
    var isIE = !!navigator.userAgent.match(/MSIE/i);
    if (isIE) { angular.element($window.document.body).addClass('ie');}
    if (isSmartDevice($window)) { angular.element($window.document.body).addClass('smart')};
    function isSmartDevice($window) {
      // Adapted from http://www.detectmobilebrowsers.com
      var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
      // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
      return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }

    // Disqus initial config
    $scope.disqusConfig = {
      disqus_shortname: CUSTOM_CONFIG.DISQUS.disqus_shortname,
      disqus_identifier: CUSTOM_CONFIG.DISQUS.disqus_identifier + 'home',
      disqus_url: location.href
    };

    // angular translate
    $scope.lang = { isopen: false };
    $scope.langs = { en: 'English', es: 'Spanish' };
    $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || 'English';
    $scope.setLang = function (langKey, $event) {
      // set the current lang
      $scope.selectLang = $scope.langs[langKey];
      // You can change the language during runtime
      $translate.use(langKey);
      $scope.lang.isopen = !$scope.lang.isopen;
    };

    activate();

    function activate() {
      //logger.success(config.appTitle + ' loaded!', null);
      //hideSplash();
    }

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function() {
        $rootScope.showSplash = false;
      }, 1000);
    }
  }
})();
