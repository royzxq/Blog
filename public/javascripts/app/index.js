(function () {
	
	'use strict';

	angular.module('app').controller('IndexController', IndexController);
	IndexController.$inject = ['$http'];

	function IndexController($http){
		var vm = this;
		
		$http.get('/subjects')
			.then(function(response){
				vm.subjects = response.data;
			});
	}
}());