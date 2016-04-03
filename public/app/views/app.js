angular.module("FoodTakesApp", ["ui.router"])

.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
		.state("home", {
			url: "/",
			templateUrl: "app/views/main.html",
		});

		$locationProvider.html5Mode(true);
}]);