var NutriPath = angular.module('NutriPath', ['formly', 'formlyBootstrap', 'ngResource', 'ngRoute', 'xeditable']);

angular.module('NutriPath').config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode({
		enabled: true
	});
	$routeProvider
		.when('/', {templateUrl: '/partials/welcome/welcome', controller:'WelcomeCtrl'})
		.when('/calendar', {templateUrl: '/partials/calendar/calendar', controller:'CalendarCtrl'})
		.when('/daily', {templateUrl: '/partials/daily/daily', controller:'DailyCtrl'})
		.when('/my-foods', {templateUrl: '/partials/foods/foods', controller:'FoodsCtrl'})
		.when('/my-meals', {templateUrl: '/partials/meals/meals', controller:'MealsCtrl'});
});

NutriPath.run(function(editableOptions) {
  editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

// angular.module('NutriPath').run(function($rootScope, $location){
// 	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
// 		if(rejection === 'not authorized'){
// 			$location.path('/');
// 		}
// 	})
// })
