(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$scope','$rootScope', '$timeout', 'config', 'logger', '$translate', '$localStorage', '$window', 'CUSTOM_CONFIG', '$uibModal'];
  /* @ngInject */
  function ShellController($scope, $rootScope, $timeout, config, logger, $translate, $localStorage,   $window, CUSTOM_CONFIG, $uibModal) {
    var vm = this;
    vm.busyMessage = 'Please wait ...';
    vm.isBusy = true;
    $rootScope.showSplash = true;
    vm.navline = { title: config.appTitle};
    var isIE = !!navigator.userAgent.match(/MSIE/i);
    if (isIE) { angular.element($window.document.body).addClass('ie');}
    if (isSmartDevice($window)) { angular.element($window.document.body).addClass('smart');}
    function isSmartDevice($window) {
      // Adapted from http://www.detectmobilebrowsers.com
      var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
      // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
      return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }

    if ($localStorage.filterLang === undefined) {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'welcomeModal.html',
        size: 'md',
        appendTo: undefined,
        controller: ['$scope', function ($scope) {
            $scope.accept = function() {
              modalInstance.close();
            };
          }]
      });
    }

    // Disqus initial config
    $scope.disqusConfig = {
      disqus_shortname: CUSTOM_CONFIG.DISQUS.disqus_shortname,
      disqus_identifier: CUSTOM_CONFIG.DISQUS.disqus_identifier + 'home',
      disqus_url: location.href,
      disqus_config_language: CUSTOM_CONFIG.LANG
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
