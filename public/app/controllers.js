angular.module("FoodTakesCtrls", ["AuthServices"])

.controller("MainCtrl", ["$scope", "Auth", function($scope, Auth) {
	$scope.logout = function() {
		Auth.removeToken();
	}
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
            $location.path('/')
        }, function error(res){
            console.log(res.data);
        });
    };
}])