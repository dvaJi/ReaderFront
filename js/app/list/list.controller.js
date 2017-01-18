(function(){
	'use strict';
	angular
    .module('app')
    .controller('ListSeriesController', ListSeriesController);
    ListSeriesController.$inject = ['comicsFac', '$scope', '$log'];
	
	function ListSeriesController(comicsFac, $scope, $log){
		var vm = this;
		vm.comics = [];
		vm.getComics = getComics;

		getComics();

		function getComics() {
	        return comicsFac.getComics()
	            .then(function(data) {
	                vm.comics = data.comics;
	                //$log.error(vm.comics);
	                return vm.comics;
	            });
    	};

	}
	
})();