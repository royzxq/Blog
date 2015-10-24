(function () {
	angular.module('app').config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl:'/javascripts/app/index.html',
				controller: 'IndexController',
				controllerAs: 'vm'
			});
	}
}());