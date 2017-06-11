(function() {
  'use strict';

  angular
    .module('app.blog')
    .controller('BlogController', BlogController);

  BlogController.$inject = ['$scope','$q','logger', 'Api', '$stateParams', 'CUSTOM_CONFIG'];
  /* @ngInject */
  function BlogController($scope, $q, logger, Api, $stateParams, CUSTOM_CONFIG) {
    var vm = this;
    vm.post = {};
    vm.posts = [];

    loadBlog();

    $scope.disqusConfig = {
      disqus_shortname: CUSTOM_CONFIG.DISQUS.disqus_shortname,
      disqus_identifier: CUSTOM_CONFIG.DISQUS.disqus_identifier + $stateParams.stub,
      disqus_url: window.location.href,
      disqus_title: 'Blog',
      disqus_disable_mobile: 'false'
    };

    function loadBlog() {
      var promises = ($stateParams.stub !== undefined && $stateParams.stub !== null) ? [getPost()] : [getPosts()];
      return $q.all(promises).then(function() {
        //logger.info('Blog view loaded!');
      });
    }

    function getPosts() {
      var query = {};
      return Api.getPosts(query)
       .then(function(data) {
          vm.posts = data;
          angular.forEach(vm.posts, function(post) {
            var ellipsis = (post.description.length >= 350) ? '...' : '';
            post.description = post.description.substring(0,350) + ellipsis;
          }, this);
          return vm.posts;
        });
    }

    function getPost() {
      var query = {stub: $stateParams.stub};
      return Api.getPost(query)
       .then(function(data) {
          vm.post = data.data.post;
          return vm.post;
        });
    }
  }
})();
