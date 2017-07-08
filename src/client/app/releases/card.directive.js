(function() {
  'use strict';

  angular
    .module('app.releases')
    .directive('card', card);

  /* @ngInject */
  function card($animate, $compile) {
    var directive = {
      restrict: 'EA',
      scope: {
        'release': '=release'
      },
      link: link,
      templateUrl: 'app/releases/card.html'
    };

    function link($scope, element, attrs) {
      /*var overlay = element.children().children('.post-overlay');
      var ovImg = element.children().children('.gallery-cover.gray').children('.responsive-img');
      var parent = element.parent();

      // Let's wait until image is fully loaded
      parent.css('display', 'none');
      ovImg.bind('load', function() {
        parent.css('display', 'initial');
      });

      overlay.addClass('animated-x4 fadeOut');
      element.bind('mouseenter', function () {
        overlay.removeClass('fadeOut');
        overlay.addClass('fadeIn');
      });
      element.bind('mouseleave', function () {
        overlay.removeClass('fadeIn');
        overlay.addClass('fadeOut');
      });*/
    }

    return directive;
  }
})();
