(function(){
	'use strict';
	angular
    .module('app')
    .controller('RecruitmentController', RecruitmentController);
    RecruitmentController.$inject = ['Api', '$scope', '$log', '$stateParams','metaService', '$rootScope'];
	
	function RecruitmentController(Api, $scope, $log, $stateParams, metaService, $rootScope){
		var vm = this;
        $rootScope.metaservice.setTitle("Ravens Scans English - Join us!");

	}
	
})();