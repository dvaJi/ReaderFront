(function () {
  'use strict';

  angular
        .module('app.widgets')
        .directive('rfSettings', rfSettings);

  rfSettings.$inject = ['$translate', '$localStorage'];
  /* @ngInject */
  function rfSettings($translate, $localStorage) {
    var directive = {
      templateUrl: 'app/widgets/rf-settings.html',
      restrict: 'EA',
      controller: rfSettingsController
    };

    rfSettingsController.$inject = ['$translate', '$scope', '$localStorage'];

    /* @ngInject */
    function rfSettingsController($translate, $scope, $localStorage) {
      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = { en: 'English', es: 'Spanish' };
      $scope.selectLang = window.localStorage.getItem('NG_TRANSLATE_LANG_KEY') || $scope.langs[$translate.proposedLanguage()] || 'en';
      $scope.setLang = function (langKey, $event) {
        // set the current lang
        $scope.selectLang = langKey;
        $localStorage.filterLang = langKey;
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };
    }

    return directive;
  }
})();
