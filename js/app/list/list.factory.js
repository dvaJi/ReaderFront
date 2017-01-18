(function(){
	'use strict';
	angular
    .module('app')
    .factory('comicsFac', comicsFac);
    comicsFac.$inject = ['$http', '$log'];
	
	function comicsFac($http, $log){
		return {
			getComics: getComics
    	};
    	function getComics() {
        return $http.get('reader/api/reader/comics')
            .then(getComicsComplete)
            .catch(getComicsFailed);

	        function getComicsComplete(response) {
	            return response.data;
	        }

	        function getComicsFailed(error) {
	            $log.error('XHR Failed for getComics.' + error.data);
	        }
    	}
	}
})();