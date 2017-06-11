(function () {
  'use strict';

  angular
        .module('app.core')
        .factory('Api', Api);

  Api.$inject = ['Restangular', 'logger', 'CUSTOM_CONFIG'];
  /* @ngInject */
  function Api(Restangular, logger, CUSTOM_CONFIG) {
    return {
      latestChapters: function (query) {
        return Restangular.all('chaptersp').getList(query);
      },
      comicsList: function (query) {
        return Restangular.all('comics').getList(query);
      },
      getComic: function (query) {
        return Restangular.one('comic').get(query);
      },
      getChapter: function (query) {
        return Restangular.one('chapter').get(query);
      },
      getComicFull: function (query) {
        return Restangular.all('comics_full').getList(query);
      },
      getPosts: function(query) {
        return Restangular.all('blog').getList(query);
      },
      getPost: function(query) {
        return Restangular.one('blog').get(query);
      },
      getPage: function(query) {
        return Restangular.one('pages').get(query);
      },
      getProjectsBoard: function (query) {
        return Restangular.allUrl('projects', CUSTOM_CONFIG.API.trelloBoard).getList(query);
      }
    };
  }
})();
