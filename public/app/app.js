angular.module("FoodTakesApp", ["ui.router", "FoodTakesCtrls"])

.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		
		$urlRouterProvider.otherwise("/");

		$stateProvider
		.state("home", {
			url: "/",
			templateUrl: "app/views/welcome.html",
			controller: "MainCtrl",
		})
		.state("signup", {
			url: "/signup",
			templateUrl: "app/views/signup.html",
			controller: "SignupCtrl"
		})
		.state("login", {
			url: "/login",
			templateUrl: "app/views/login.html",
			controller: "LoginCtrl"
		})

		$locationProvider.html5Mode(true);
}])
.config(["$httpProvider", function($httpProvider) {
	$httpProvider.interceptors.push("AuthInterceptor")
}])
.run(["$rootScope", "Auth", function($rootScope, Auth) {
	$rootScope.isLoggedIn = function() {
		return Auth.isLoggedIn.apply(Auth)
	}
}]);