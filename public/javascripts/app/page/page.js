(function () {
	'use strict';
	angular.module('app').controller('PageController', PageController);

	PageController.$inject = ['$routeParams','$location', '$http','$window'];

	function PageController($routeParams,$location,$http,$window){
		var vm = this;
		$http.get('/subjects/' + $routeParams.name + '/' + $routeParams.title)
			.then(function(response){
				vm.page = response.data;
				console.log(response);
			});

		vm.edit = function(title){
			$window.location.href = '/pages/update/'+title;
		}
		vm.getSub = function(name){
			$location.url('/subject/' + name)
		}
	}
}());