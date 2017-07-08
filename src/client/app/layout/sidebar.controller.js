(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state', 'routerHelper', 'Api', '$scope'];
  /* @ngInject */
  function SidebarController($state, routerHelper, Api, $scope) {
    var vm = this;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.currentLang = window.localStorage.getItem('NG_TRANSLATE_LANG_KEY');
    vm.disablePageNav = true;

    activate();

    function activate() { getNavRoutes(); getPages(); }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        if (r.name === 'pages') {
          return null;
        }
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    $scope.$watch(function() {
      if (vm.currentLang !== window.localStorage.getItem('NG_TRANSLATE_LANG_KEY')) {
        vm.currentLang = window.localStorage.getItem('NG_TRANSLATE_LANG_KEY');
        getPages();
      }
    });

    function getPages() {
      var query = {lang: vm.currentLang};
      return Api.getPage(query)
        .then(function(data) {
          vm.pageNavRoutes = data.data;
          if (vm.pageNavRoutes.length > 0) {
            vm.disablePageNav = false;
          }
          return vm.pageNavRoutes;
        })
        .catch(function(error) {
          vm.disablePageNav = true;
          if (error.status !== 404) {
            console.log(error);
          }
        });
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }
  }
})();
