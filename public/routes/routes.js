var module = angular.module("notes", ['ngRoute']);

module.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'routes/notes/notes.html',
            controller: 'NotesCtrl'
        }).when('/section/:name', {
            templateUrl: 'routes/viewSection/viewSection.html',
            controller: 'ViewSectionController'
        }).otherwise({
            redirectTo: '/'
        })


    });
