(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state', 'routerHelper', 'Api'];
  /* @ngInject */
  function SidebarController($state, routerHelper, Api) {
    var vm = this;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
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

    function getPages() {
      var query = {};
      return Api.getPage(query)
       .then(function(data) {
          vm.pageNavRoutes = data.data;
          if (vm.pageNavRoutes.length > 0) {
            vm.disablePageNav = false;
          }
          return vm.pageNavRoutes;
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
