(function () {
	
	'use strict';

	angular.module('app').controller('IndexController', IndexController);
	IndexController.$inject = ['$http','$window','$location'];

	function IndexController($http,$window,$location){
		var vm = this;
		
		$http.get('/subjects')
			.then(function(response){
				vm.subjects = response.data;
			});

		vm.edit = function(name){
			console.log(name);
			$window.location.href = '/update/'+name;
		}

		vm.getSub = function(name){
			$location.url('/subject/' + name)
		}
	}
}());