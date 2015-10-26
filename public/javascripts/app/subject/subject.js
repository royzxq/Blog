(function () {
	'use strict';
	angular.module('app').controller('SubjectController', SubjectController);

	SubjectController.$inject = ['$routeParams','$location', '$http','$window'];

	function SubjectController($routeParams,$location,$http,$window){
		var vm = this;
		var url = '/subjects/' + $routeParams.name + '/';
		
		$http.get(url)
			.then(function(response){
				vm.subject = response.data;
			});

		vm.edit = function(title){
			$window.location.href = '/pages/update/'+title;
		}

		vm.getPage = function(title){
			$location.url('/subject/' + $routeParams.name + '/' + title);
		}
	}
}());