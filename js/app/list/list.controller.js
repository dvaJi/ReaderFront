(function(){
	'use strict';
	angular
    .module('app')
    .controller('ListSeriesController', ListSeriesController);
    ListSeriesController.$inject = ['comicsFac', '$scope', '$log', 'metaService', '$rootScope'];
	
	function ListSeriesController(comicsFac, $scope, $log, metaService, $rootScope){
		var vm = this;
		vm.comics = [];
		vm.getComics = getComics;
		vm.loading = true;

		$rootScope.metaservice.setTitle("Ravens Scans English - All Comics");

		getComics();

		function getComics() {
			vm.loading = true;
	        return comicsFac.getComics()
	            .then(function(data) {
	                vm.comics = data.comics;
					vm.loading = false;
	                //$log.error(vm.comics);
	                return vm.comics;
	            });
    	};

	}
	
})();