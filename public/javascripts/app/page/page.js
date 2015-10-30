(function () {
	'use strict';
	angular.module('app').controller('PageController', PageController);

	PageController.$inject = ['$routeParams','$location', '$http','$window'];

	function PageController($routeParams,$location,$http,$window){
		var vm = this;
		vm.isTag = false;
		$http.get('/subjects/' + $routeParams.name + '/' + $routeParams.title)
			.then(function(response){
				vm.page = response.data;
				if (vm.page.tags.length === 0) {
					vm.page.tags.push("No tag yet");
				};
			});

		$http.get('/users/getUser')
			.then(function(response){
				// console.log(response.data);
				vm.user = response.data;
			})
			
		vm.edit = function(title){
			$window.location.href = '/pages/update/'+title;
			// $location.url('/pages/update/' + title);
		}
		vm.getSub = function(name){
			$location.url('/subject/' + name)
		}

		vm.showTag = function(){
			vm.isTag = !vm.isTag;
		}
	}
}());