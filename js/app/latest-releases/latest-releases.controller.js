(function(){
	'use strict';
	angular
    .module('app')
    .controller('LatestReleasesController', LatestReleasesController);
    LatestReleasesController.$inject = ['releasesFac', '$scope', '$log'];
	
	function LatestReleasesController(releasesFac, $scope, $log){
		var vm = this;
		vm.releases = [];
		vm.getReleases = getReleases;

		getReleases();

		function getReleases() {
	        return releasesFac.getReleases()
	            .then(function(data) {
	                vm.releases = data.chapters;
	                //$log.error(vm.releases);
	                return vm.releases;
	            });
    	};

	}
	
})();