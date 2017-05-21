(function() {
  'use strict';

  angular
    .module('app.blog')
    .controller('BlogController', BlogController);

  BlogController.$inject = ['$scope','$q','logger', 'Api', '$stateParams'];
  /* @ngInject */
  function BlogController($scope, $q, logger, Api, $stateParams) {
    var vm = this;
    vm.post = {};
    vm.posts = [];
    vm.getPosts = getPosts;
    vm.getPost = getPost;

    loadBlog();

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
