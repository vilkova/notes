module.controller("NotesCtrl", function ($scope, $http, $routeParams, $location) {

    $scope.notes = [];
    $scope.sections = [];


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
                    $scope.activeSection = $routeParams.section;

                }
                $scope.sections = sections;

                update();
            })
    }
    readSections();
    //
    // $scope.notes = function () {
    //     $http.get("/notes")
    //         .success(function (notes) {
    //             $scope.notes = notes;
    //         });
    // };

    $scope.add = function () {
        var note = {
            text: $scope.text,
            date: new Date()
        };
        $http.post("/notes", note)
            .success(function () {
                    note.section = $scope.activeSection;
                    if (!$scope.text || $scope.text.length == 0) return;
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

    $scope.showSection = function (section) {
        $scope.activeSection = section.title;
        update();
        $location.path(section.title);
    }

    $scope.addSection = function () {
        if ($scope.newSection.length == 0) {
            return;
        }
        // check for duplicates
        for (var i = 0; i < $scope.sections.length; i++) {
            if ($scope.sections[i].title == $scope.newSection) {
                return;
            }
        }
        var section = {title: $scope.newSection};
        var sections = Array.prototype.slice.call( $scope.sections);
        sections.unshift(section);
        $scope.activeSection = $scope.newSection;
        $scope.newSection = "";
        console.log($scope.sections);
        $scope.writeSections();
        update();

    }

    $scope.writeSections = function () {
        console.log($scope.sections);
        if ($scope.sections && $scope.sections.length > 0) {
            console.log("write section in db " + $scope.sections.title)
            $http.post("/sections/replace", $scope.sections);
        }
    }


});




