(function(){
	'use strict';
	angular
    .module('app')
    .factory('comicFac', comicFac);
    comicFac.$inject = ['$http', '$log'];
	
	function comicFac($http, $log){
		return {
			getComics: getComics
    	};
    	function getComics(id) {
        return $http.get('reader/api/reader/comic/stub/' + id)
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