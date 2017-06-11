// jshint ignore: start
// jscs:disable
(function () {
'use strict';
angular.module('app.core')
.constant('CUSTOM_CONFIG', {
  "NAME": "readerfront",
  "NAVTITLE": "Reader Front",
  "META": {
    "title": "ReaderFront",
    "description": "Ayyyy",
    "keywords": "scan,manga,english,free"
  },
  "API": {
    "foolslideUrl": "api/v1/",
    "trelloBoard": "https://trello.com/b/UleeTPT2.json"
  },
  "DEV": {
    "foolslideUrl": "http://localhost:80/FoOlSlide/"
  },
  "DISQUS": {
    "disqus_shortname": "readerfront",
    "disqus_identifier": "ReaderFront_"
  }
});})();