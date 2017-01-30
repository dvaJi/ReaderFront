(function(){
	'use strict';
	angular
    .module('app')
    .controller('LatestReleasesController', LatestReleasesController);
    LatestReleasesController.$inject = ['Api', '$scope', '$log', 'metaService', '$rootScope'];
	
	function LatestReleasesController(Api, $scope, $log, metaService, $rootScope){
		var vm = this;
		vm.releases = [];
		vm.getReleases = getReleases;
		vm.loading = true;

        $rootScope.metaservice.setTitle("Ravens Scans English - Index");

		getReleases();

		function getReleases() {
			vm.loading = true;
	        return Api.latestChapters({per_page:9,orderby:"desc_created"})
	            .then(function(data) {
					vm.releases = data[0].chapters;
					vm.loading = false;
	                //$log.error(vm.releases);
	                return vm.releases;
	            });
    	};

	}
	
})();