var swcApp = angular.module('swcApp', ['ngRoute']);

// configure our routes
swcApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })

        .when('/signup', {
            templateUrl: 'pages/signup.html',
            controller: 'signupController'
        })

        .when('/logout', {
            templateUrl: 'pages/logout.html',
            controller: 'logoutController'
        })


});

//creating different controllers
swcApp.controller('loginController', ['$window','$http', '$scope', function ($http, $scope, $window) {

    data = {
        email:$scope.signinform.email,
        password:$scope.signinform.password
    };

    $http.post('http://localhost:3000/api/user/login',data).success(function (data) {
        if(data.result === "true") {
            $window.location.href = 'views/cacheIndex.html';
        }
    });
}]);


swcApp.controller('signupController', ['$window','$http', '$scope', function ($http, $scope, $window) {

    data = {
        username:$scope.signupform.username,
        email:$scope.signupform.email,
        password:$scope.signupform.password,
        name:$scope.signupform.name
    };

    $http.post('http://localhost:3000/api/user/signup',data).success(function (data) {
        if(data.result === "true") {
            $window.location.href = 'views/cacheIndex.html';
        }
    });
}]);

swcApp.controller('logoutController', ['$window','$http', '$scope', function ($http, $scope, $window) {


    $http.get('http://localhost:3000/api/user/logout',data).success(function (data) {
        if(data.result === "true") {
            $window.location.href = 'index.html';
        }
    });
}]);



