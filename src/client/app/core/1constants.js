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
    "foolslideUrl": "http://localhost/FoOlSlide/api/v1/"
  },
  "DISQUS": {
    "disqus_shortname": "readerfront",
    "disqus_identifier": "ReaderFront_"
  }
});})();