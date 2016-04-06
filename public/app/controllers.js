angular.module("FoodTakesCtrls", ["AuthServices", "ngAnimate"])

// .controller("MainCtrl", ["$scope", "Auth", function($scope, Auth) {
// 	$scope.logout = function() {
// 		Auth.removeToken();
// 	}
// }])

.controller("DashboardCtrl", ["$scope", "$stateParams", "User", function($scope, $stateParams, User) {
	$scope.user = {};

	User.get({id: $stateParams.id}, function success(data) {
		$scope.user = data;
	}, function error(data) {
		console.log(data);
	});
}])

.controller("SignupCtrl", ["$scope", "$http", "$location", "Auth", function($scope, $http, $location, Auth) {
	$scope.user = {
		email: "",
		password: ""
	};
	$scope.signup = function() {
		$http.post("/users", $scope.user).then(function success(res) {
			console.log(res);
			$location.path("/");
		}, function error(res) {
			console.log(res);
		});
	}
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth){
    $scope.user = {
        email: '',
        password: ''
    };
    $scope.actionName = 'Login';
    $scope.login = function(){
        $http.post('/auth', $scope.user).then(function success(res){
        	console.log(res);
            Auth.saveToken(res.data.token);
            $location.path('/dashboard');
        }, function error(res){
            console.log(res.data);
        });
    };
}])
.controller('NavCtrl', ['$scope', 'Auth', '$state', function($scope, Auth, $state) {
	$scope.Auth = Auth;

	$scope.logout = function() {
	Auth.removeToken();
	$location.path('/welcome');
	}
}])

.controller("RatingsCtrl", ["$scope", "$stateParams", function($scope, $stateParams) {
	// $scope.id = $routeParams.id;
	console.log($stateParams);

	$scope.rate = 0;
	$scope.max = 5;
	$scope.isReadonly = false;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	}

}])

.controller("SearchPlacesCtrl", ["$scope", "$http", function($scope, $http) {
	$scope.searchTerms = {
		name: '',
		location: ''
	};

	$scope.results = [];

	$scope.search = function() {
		$http.post("/search", $scope.searchTerms).then(function success(res) {
			$scope.results = res.data.businesses;
			console.log($scope.results);
		}, function error(res) {
			console.log(res);
		});
	}
}])