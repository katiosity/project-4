angular.module("FoodTakesCtrls", ["AuthServices", "ngAnimate"])

// .controller("MainCtrl", ["$scope", "Auth", function($scope, Auth) {
// 	$scope.logout = function() {
// 		Auth.removeToken();
// 	}
// }])

.controller("DashboardCtrl", ["$scope", "$stateParams", function($scope, $stateParams) {

}])

.controller("SignupCtrl", ["$scope", "$http", "$location", "$rootScope", "Auth", function($scope, $http, $location, $rootScope, Auth) {
	$scope.user = {
		email: "",
		password: ""
	};
	$scope.signup = function() {
		$http.post("/users", $scope.user).then(function success(res) {
			console.log(res);
			$rootScope.userName = res.data.alias;
			$location.path("/");
		}, function error(res) {
			console.log(res);
		});
	}
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', "$rootScope", function($scope, $http, $location, Auth, $rootScope){
    $scope.user = {
        email: '',
        password: ''
    };
    $scope.actionName = 'Login';
    $scope.login = function(){
        $http.post('/auth', $scope.user).then(function success(res){
        	// console.log(res);
            Auth.saveToken(res.data.token);
            $rootScope.user = res.data;
            console.log($rootScope.user);
            $location.path('/dashboard');
        }, function error(res){
            console.log(res.data);
        });
    };
}])
.controller('NavCtrl', ['$scope', 'Auth', '$state', "$location", function($scope, Auth, $state, $location) {
	$scope.Auth = Auth;

	$scope.logout = function() {
	Auth.removeToken();
	$location.path('/welcome');
	}
}])

.controller("RatingsCtrl", ["$scope", "$stateParams", "$rootScope", "$http", "$location", function($scope, $stateParams, $rootScope, $http, $location) {
	// console.log($stateParams);
	// console.log($rootScope.results);
	$scope.rate = 0;
	$scope.max = 5;
	$scope.isReadonly = false;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	$scope.review = {
		// place: "",
		imageUrl: "",
		imageDescription: "",
		review: "",
		food: 0,
		drinks: 0,
		service: 0,
		atmosphere: 0
	};

	$scope.submitReview = function() {
		console.log($scope.review);
		
		$http.post("/reviews", $scope.review).then(function success(res) {
			console.log(res.data);
			$location.path("/dashboard");
		}, function error(res) {
			console.log(res.data);
		})
		
	};

}])

.controller("SearchPlacesCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
	$scope.searchTerms = {
		name: '',
		location: ''
	};

	$scope.results = [];
	$rootScope.results  = [];

	$rootScope.moreDetails = function(details) {
		$rootScope.results = details;
	};

	$scope.search = function() {
		$http.post("/search", $scope.searchTerms).then(function success(res) {
			$scope.results = res.data.businesses;
			console.log($scope.results);
		}, function error(res) {
			console.log(res);
		});
	}
}])