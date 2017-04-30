(function() {
  'use strict';

  angular
    .module('app.releases')
    .directive('card', card);

  /* @ngInject */
  function card() {
    var directive = {
      restrict: 'EA',
      scope: {
        'release': '=release'
      },
      templateUrl: 'app/releases/card.html'
    };

    return directive;
  }
})();
