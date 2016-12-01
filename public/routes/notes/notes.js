// var module = angular.module("myapp", []);

module.controller("NotesCtrl", function ($scope, $http) {
    $scope.notes = [];
    $scope.sections = [];

    var get = function () {
        $http.get("/notes")
            .success(function (notes) {
                $scope.notes = notes;
            });
    }

    var update = function () {
        var params = {params: {section: $scope.sections.activeSection}};
        $http.get("/notes", params)
            .success(function (notes) {
                $scope.notes = notes;

            });
    };

    var readSections = function () {
        $http.get("/sections")
            .success(function (sections) {
                if (sections.length > 0) {
                    console.log(sections[0].title);
                    $scope.activeSection = sections[0].title;
                }
                $scope.sections = sections;
                update();
            })
    }

    $scope.notes = get();
    readSections();

    $scope.add = function () {
        var note = {
            text: $scope.text,
            date: new Date(),
            order: ""
        };
        note.section = $scope.activeSection;
        if (!$scope.text || $scope.text.length==0) return;
        $http.post("/notes", note)
            .success(function () {
                    $scope.text = "";
                    update();
                }
            );
        console.log("Note is added: " + $scope.text);
    };

    $scope.remove = function (id) {
        $http.delete("/notes", {params: {id: id}})
            .success(function () {
                console.log("Note with id " + id + " is deleted");
                update();
            });
    };


    //
    // $scope.orderNote = function () {
    //     $http.post("/order", {})
    //         .success(function () {
    //             update();
    //         });
    // }

    $scope.showSection = function (section) {
        $scope.activeSection = section.title;
        update();
    }

    $scope.addSection = function () {
        if ($scope.newSection.length==0) {
            return;
        }
        // check for duplicates
        for (var i=0;i<$scope.sections.length;i++) {
            if ($scope.sections[i].title==$scope.newSection) {
                return;
            }
        }
        var section = {title: $scope.newSection};
        $scope.sections.unshift(section);
        $scope.activeSection = $scope.newSection;
        $scope.newSection = "";
        $scope.writeSections();
        update();

    }

    $scope.writeSections = function () {
        if ($scope.sections && $scope.sections > 0) {
            $http.post("/sections/replace", $scope.sections);
        }
    }


});




