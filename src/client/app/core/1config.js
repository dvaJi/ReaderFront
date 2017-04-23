(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('newRestangular', newRestangular);

  newRestangular.$inject = ['Restangular', '$http'];
  /* @ngInject */
  function newRestangular(Restangular, $http) {
    var data = function () {
      return $http.get('./rf.config.json');
    };
    return { data: data };
  }
})();
