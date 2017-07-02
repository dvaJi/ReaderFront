(function() {
  'use strict';

  angular
    .module('app.pages')
    .controller('PagesController', PagesController);

  PagesController.$inject = ['$scope','$q','Api','logger', '$stateParams', 'CUSTOM_CONFIG'];
  /* @ngInject */
  function PagesController($scope, $q, Api, logger, $stateParams, CUSTOM_CONFIG) {
    var vm = this;
    vm.page = [];
    vm.loading = true;

    loadPage();

    $scope.disqusConfig = {
      disqus_shortname: CUSTOM_CONFIG.DISQUS.disqus_shortname,
      disqus_identifier: CUSTOM_CONFIG.DISQUS.disqus_identifier + $stateParams.stub,
      disqus_url: window.location.href,
      disqus_title: 'Blog',
      disqus_disable_mobile: 'false'
    };

    function loadPage() {
      var promises = [getPage()];
      return $q.all(promises).then(function() {
        vm.loading = false;
        //logger.info('Activated pages View');
      });
    }

    function getPage() {
      var query = {stub: $stateParams.stub};
      return Api.getPage(query)
       .then(function(data) {
          vm.page = data.data.custompage;
          return vm.page;
        });
    }
  }
})();
