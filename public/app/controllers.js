angular.module("FoodTakesCtrls", [])

.controller("SignupCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
	$scope.user = {
		email: "",
		password: ""
	};
	$scope.userSignup = function() {
		$http.post("/user", $scope.user).then(function success(res) {
			$location.path("/");
		}, function error(res) {
			console.log(res);
		});
	}
}])