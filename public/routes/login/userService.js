module.factory("UserService", function ($http, $rootScope, $timeout, $q) {
    var service = {};
    service.userName = "";
    service.loggedIn = false;

    service.login = function (login, password) {
        console.log(password)
        var deferred = $q.defer();
        $http.post("/login", {login: login, password: password})
            .success(function (res) {
                if (res) {
                    deferred.resolve("logged in");
                    service.loggedIn = true;
                    service.userName = login;
                    console.log("logged in!");
                } else {
                    deferred.reject("wrong username/password");
                    console.log("wrong user/password!");
                    $rootScope.wrongPassword = true;
                    $timeout(function () {
                        $rootScope.wrongPassword = false;
                    }, 2000);
                }
            });
        return deferred.promise;
    }

    service.logout = function () {
        return $http.get("/logout");
    }
    console.log(service);
    return service;
});