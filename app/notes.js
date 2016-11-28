'use strict';
var module = angular.module("myapp", []);

module.controller("notesCtrl", function ($scope) {
    $scope.notes = [];

    var update = function () {
        $scope.notes = [
            {text: "note 1"},
            {text: "note 2"},
            {text: "note 3"}
        ];

    };

    update();


});


// var express = require("express");
// var app = express();
// var path = require("path");
//
// app.get("/notes", function (req, res) {
//    var notes = [
//        {text : "note 1"},
//        {text : "note 2"},
//        {text : "note 3"}
//    ];
//     res.send(notes);
// });

