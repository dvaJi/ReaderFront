(function(){
	'use strict';
	angular
    .module('app')
    .controller('ListSeriesController', ListSeriesController);
    ListSeriesController.$inject = ['Api', '$scope', '$log', 'metaService', '$rootScope'];
	
	function ListSeriesController(Api, $scope, $log, metaService, $rootScope){
		var vm = this;
		vm.comics = [];
		vm.getComics = getComics;
		vm.loading = true;

		$rootScope.metaservice.setTitle("Ravens Scans English - All Comics");

		getComics();

		function getComics() {
			vm.loading = true;
	        return Api.comicsList({orderby:"asc_name"})
	            .then(function(data) {
					vm.comics = data[0].comics;
					vm.loading = false;
	                //$log.error(vm.comics);
	                return vm.comics;
	            });
    	};

	}
	
})();