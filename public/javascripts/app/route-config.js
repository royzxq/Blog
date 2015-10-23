(function () {
	angular.module('app').config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider){
		$routeProvider
			.when('/',{
				tempateUrl:'/javascript/index.html',
				controller: 'IndexController',
				controllerAs: 'vm'
			});
	}
}());