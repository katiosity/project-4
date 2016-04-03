angular.module("FoodTakesApp", ["ui.router", "FoodTakesCtrls"])

.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		
		$urlRouterProvider.otherwise("/");

		$stateProvider
		.state("home", {
			url: "/",
			templateUrl: "app/views/main.html",
		})
		.state("signup", {
			url: "/signup",
			templateUrl: "app/views/signup.html",
			controller: "SignupCtrl"
		});

		$locationProvider.html5Mode(true);
}]);