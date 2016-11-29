var module = angular.module("myapp", []);

module.controller("NotesCtrl", function ($scope, $http) {
    $scope.notes = [];
    $scope.add = function () {
        var note = {text: $scope.text}
        console.log("Note is added: " + $scope.text);
        $http.post("/notes", note)
            .success(function () {
                    $scope.text = "";
                    update();
                }
            );
    }

    $scope.delete = function (id) {
        $http.delete("/notes", {params: {id: id}})
            .success(function () {
                update();
            });
        console.log("Note with id " + id + " is deleted");
    }

    var update = function () {
        $http.get("/notes")
            .success(function (notes) {
                $scope.notes = notes;
            });
    };


});




