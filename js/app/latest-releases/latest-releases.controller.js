(function(){
	'use strict';
	angular
    .module('app')
    .controller('LatestReleasesController', LatestReleasesController);
    LatestReleasesController.$inject = ['releasesFac', '$scope', '$log', 'metaService', '$rootScope'];
	
	function LatestReleasesController(releasesFac, $scope, $log, metaService, $rootScope){
		var vm = this;
		vm.releases = [];
		vm.getReleases = getReleases;
		vm.loading = true;

        $rootScope.metaservice.setTitle("Ravens Scans English - Index");

		getReleases();

		function getReleases() {
			vm.loading = true;
	        return releasesFac.getReleases()
	            .then(function(data) {
	                vm.releases = data.chapters;
					vm.loading = false;
	                //$log.error(vm.releases);
	                return vm.releases;
	            });
    	};

	}
	
})();