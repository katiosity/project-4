angular.module("FoodTakesApp", ["ui.router", "FoodTakesCtrls", "ui.bootstrap", "ngRoute"])

.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$routeProvider",
	function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider) {
		
		$urlRouterProvider.otherwise("/");

		$stateProvider
		.state("welcome", {
			url: "/welcome",
			templateUrl: "app/views/welcome.html",
			controller: "NavCtrl",
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
		.state("dashboard", {
			url: "/dashboard",
			templateUrl: "app/views/userDashboard.html",
			controller: "DashboardCtrl"
		})
		.state("newReview", {
			url: "/reviews/new/:id",
			templateUrl: "app/views/newReview.html",
			controller: "RatingsCtrl",
		})
		.state("searchPlaces", {
			url: "/restaurants/search",
			templateUrl: "app/views/placeSearch.html",
			controller: "SearchPlacesCtrl"
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