(function(){
	'use strict';
	angular
    .module('app')
   .service('metaService', metaService);
    metaService.$inject = [];
   
   
   function metaService() {
    var title = 'Ravens Scans English';
    var metaKeywords = 'manga, scanlation, comics, reading, shonen, seinen';
    var metaDescription = 'Scanlating our best any abandoned or new series.';
    var metaAuthors = 'DvaJi';
    return {
        set: function(newTitle, newMetaDescription, newKeywords,newAuthors) {
            metaKeywords = newKeywords;
            metaDescription = newMetaDescription;
            title = newTitle;
            metaAuthors = newAuthors;
        },
        setTitle:function(newTitle){
            title = newTitle;
        },
        setDescription:function(newMetaDescription){
            metaDescription = newMetaDescription;
        },
        setKeywords:function(newKeywords){
            metaKeywords = newKeywords;
        },
        setAuthors:function(newAuthors){
            metaAuthors = newAuthors;
        },
        metaTitle: function(){ return title; },
        metaDescription: function() { return metaDescription; },
        metaKeywords: function() { return metaKeywords; },
        metaAuthors: function() { return metaAuthors; }
    };
   };
})();