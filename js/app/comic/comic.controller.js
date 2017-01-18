(function(){
	'use strict';
	angular
    .module('app')
    .controller('ComicController', ComicController);
    ComicController.$inject = ['comicFac', '$scope', '$log', '$stateParams'];
	
	function ComicController(comicFac, $scope, $log, $stateParams){
		var vm = this;
		vm.comic = [];
		vm.chapters = [];
		vm.getComic = getComic;

		getComic();

		function getComic() {
	        return comicFac.getComics($stateParams.id)
	            .then(function(data) {
	                vm.comic = data.comic;
					vm.chapters = data.chapters;
	                //$log.error(vm.comic);
					//$log.error(vm.chapters);
	                return vm.comic;
	            });
    	};

	}
	
})();