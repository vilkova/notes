module.controller('LoginCtrl', function ($scope, $http, UserService, $timeout, $location, $route) {
    $scope.loggedIn = UserService.loggedIn;

    console.log($scope.loggedIn)
    $scope.login = function () {
        console.log($scope.userpassword);
        UserService.login($scope.username, $scope.userpassword).then(
            function () {
                $scope.loggedIn = true;
                console.log("qqq"+$scope.loggedIn)
                $location.path("/");
                $route.reload();
            },
            function () {
                $scope.wrongPassword = true;
                $timeout(function () {
                    $scope.wrongPassword = false;
                }, 1000);
            }
        );
    }
    console.log($scope.loggedIn)
    $scope.logout = function() {
        console.log("in logout function")
        UserService.logout().then(function() {
            $scope.loggedIn = false;
            console.log($scope.loggedIn)
            $location.path("/");
            $route.reload();
        });
    }
});