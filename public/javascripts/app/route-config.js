(function () {
	angular.module('app').config(config);

	config.$inject = ['$routeProvider'];
	function config($routeProvider){
		$routeProvider
			.when('/',{
				templateUrl:'/javascripts/app/index.html',
				controller: 'IndexController',
				controllerAs: 'vm'
			})
			.when('/subject/:name',{
				templateUrl:'/javascripts/app/subject/subject.html',
				controller: 'SubjectController',
				controllerAs: 'vm'
			})
			.when('/subject/:name/:title',{
				templateUrl:'/javascripts/app/page/page.html',
				controller: 'PageController',
				controllerAs: 'vm'
			});

	}
}());