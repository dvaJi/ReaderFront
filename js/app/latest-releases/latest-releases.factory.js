(function(){
	'use strict';
	angular
    .module('app')
    .factory('releasesFac', releasesFac);
    releasesFac.$inject = ['$http', '$log'];
	
	function releasesFac($http, $log){
		return {
        	getReleases: getReleases,
			getReleasesBySerie: getReleasesBySerie
    	};
    	function getReleases() {
        return $http.get('reader/api/reader/chaptersp/per_page/9/orderby/desc_created')
            .then(getReleasesComplete)
            .catch(getReleasesFailed);

	        function getReleasesComplete(response) {
	            return response.data;
	        }

	        function getReleasesFailed(error) {
	            $log.error('XHR Failed for getReleases.' + error.data);
	        }
    	}
		function getReleasesBySerie(id) {
			return $http.get('api/v1/releases/' + id)
            .then(getReleasesBySerieComplete)
            .catch(getReleasesBySerieFailed);

	        function getReleasesBySerieComplete(response) {
	            return response.data;
	        }

	        function getReleasesBySerieFailed(error) {
	            $log.error('XHR Failed for  getReleasesBySerie.' + error.data);
	        }
		}
	}
})();