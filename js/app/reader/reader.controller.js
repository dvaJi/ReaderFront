(function(){
	'use strict';
	angular
    .module('app')
    .controller('ReaderController', ReaderController);
    ReaderController.$inject = ['Api', '$scope', '$log', '$stateParams','metaService', '$rootScope', 'hotkeys'];
	
	function ReaderController(Api, $scope, $log, $stateParams, metaService, $rootScope, hotkeys){
		var vm = this;
		vm.comic = [];
        vm.comics = [];
		vm.chapter = [];
        vm.chapters = [];
        vm.pages = [];
        vm.pagesList = [];
        vm.pageSelected = 1;
        vm.chapterSelected = $stateParams.chapter;
        vm.lastPage = 0;
		vm.getComic = getComic;
        vm.getComics = getComics;
        vm.changePageSelected = changePageSelected;
        vm.changePageClick = changePageClick;
        vm.setDisqusConfig = setDisqusConfig;

		getComic();

        getComics()

        function setDisqusConfig(){
            $scope.disqusConfig = {
                    disqus_shortname: 'ravens-scans-english',
                    disqus_identifier: "RS_" + $stateParams.id + "_" + $stateParams.chapter,
                    disqus_url: window.location.href,
                    disqus_title: vm.comic.name + " chapter " + vm.chapter.chapter + " - " + $scope.siteName,
                    disqus_disable_mobile: 'false'
            };
        }
        

		function getComic() {
            var query = {};
            if($stateParams.chapter.indexOf('.') !== -1)
            {
                query = {stub: $stateParams.id, chapter:$stateParams.chapter.split(".")[0], subchapter: $stateParams.chapter.split(".")[1] };
            } else {
                query = {stub: $stateParams.id, chapter:$stateParams.chapter};
            }
	        return Api.getComic(query)
	            .then(function(data) {
	                vm.comic = data.comic;
                    $rootScope.metaservice.setTitle("Ravens Scans English - Reading " + vm.comic.name + " chapter " + $stateParams.chapter);

                    angular.forEach(data.chapters, function(value, key) {
                        if($stateParams.chapter.indexOf('.') !== -1){
                            if(value.chapter.chapter == $stateParams.chapter.split(".")[0] && value.chapter.subchapter == $stateParams.chapter.split(".")[1]){
                                vm.chapter = value.chapter;
                            }
                        } else {
                            if(value.chapter.chapter == vm.chapterSelected && value.chapter.subchapter == "0"){
                                vm.chapter = value.chapter;
                            }
                        }
                        
                        if(value.chapter.subchapter != null && value.chapter.subchapter != "0"){
                            vm.chapters.push(value.chapter.chapter + "." + value.chapter.subchapter);
                        } else {
                            vm.chapters.push(value.chapter.chapter);
                        }
                        
                    });
                    vm.pages = vm.chapter.pages;
                    angular.forEach(vm.pages, function(value, key) {
                        vm.pagesList.push(key+1);
                    });
                    vm.lastPage = vm.pages.length;
                    setDisqusConfig();                    
	                return vm.comic;
	            });
    	};

        function getComics() {
	        return Api.comicsList()
	            .then(function(data) {
                    vm.comics = data[0].comics;
	                return vm.comics;
	            });
    	};

        function changePageSelected(page){
            if(vm.pageSelected === vm.lastPage){
                vm.pageSelected = 'END';
            } else if(page <= 0) {
                vm.pageSelected = 1;
            } else {
                vm.pageSelected = page;
            }
        }

        function changePageClick(page){
            if(vm.pageSelected === vm.lastPage){
                vm.pageSelected = 'END';
            } else {
                vm.pageSelected = page+2;
            }
        }

        // Hotkeys config
        hotkeys.add({
            combo: 'right',
            description: 'Next page',
            callback: function() {
                changePageSelected(vm.pageSelected+1);
            }
        });
        hotkeys.add({
            combo: 'left',
            description: 'Previous page',
            callback: function() {
                changePageSelected(vm.pageSelected-1);
            }
        });

	}
	
})();