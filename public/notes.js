var module = angular.module("myapp", []);

module.controller("NotesCtrl", function ($scope, $http) {
    $scope.notes = [];

    var update = function () {
        $http.get("/notes")
            .success(function (notes) {
                $scope.notes = notes;
            })
        ;

    };

    update();


});




