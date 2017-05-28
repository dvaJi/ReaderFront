(function () {
  'use strict';

  angular
        .module('app.widgets')
        .filter('momentf', momentf);

  momentf.$inject = [];
  /* @ngInject */
  function momentf() {
    return function(dateString, format) {
        return window.moment(dateString).format(format);
      };
  }
})();
