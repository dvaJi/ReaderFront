(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$scope','$rootScope', '$timeout', 'config', 'logger', 'CUSTOM_CONFIG'];
  /* @ngInject */
  function ShellController($scope, $rootScope, $timeout, config, logger, CUSTOM_CONFIG) {
    var vm = this;
    vm.busyMessage = 'Please wait ...';
    vm.isBusy = true;
    $rootScope.showSplash = true;
    vm.navline = { title: config.appTitle};

    // Disqus initial config
    $scope.disqusConfig = {
      disqus_shortname: CUSTOM_CONFIG.DISQUS.disqus_shortname,
      disqus_identifier: CUSTOM_CONFIG.DISQUS.disqus_identifier + 'home',
      disqus_url: location.href
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
