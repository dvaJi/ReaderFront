import * as config from "../config";

function getSerie(lang, stub) {
  return fetch(`${config.READER_PATH}v2/comic?lang=${lang}&stub=${stub}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(serie) {
      return serie;
    });
}

function getSeries(lang) {
  return fetch(
    `${config.READER_PATH}v2/comics?lang=${lang}&orderby=asc_name&per_page=120`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(series) {
      return series;
    });
}

function getReleases(lang, page) {
  return fetch(
    `${
      config.READER_PATH
    }v2/releases?lang=${lang}&orderby=desc_created&page=${page}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(releases) {
      return releases;
    });
}

function getChapters(stub, lang) {
  return fetch(
    `${config.READER_PATH}v2/chapters?stub=${stub}&lang=${lang}&per_page=100`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(chapters) {
      return chapters.sort((a, b) => b.chapter - a.chapter);
    });
}

function getPosts(page) {
  return fetch(
    `${config.BLOG_PATH}/posts?orderby=date&per_page=15&page=${page}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(posts) {
      return posts;
    });
}

function getPost(id) {
  return fetch(`${config.BLOG_PATH}/posts/${id}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(post) {
      return post;
    });
}

export default {
  getPost,
  getPosts,
  getSeries,
  getReleases,
  getChapters,
  getSerie
};
