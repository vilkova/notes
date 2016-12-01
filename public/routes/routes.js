var module = angular.module("myapp", ['ngRoute']);


module.config(
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'routes/notes/notes.html',
            controller: 'NotesCtrl'
        }).otherwise({
            redirectTo: '/'
        })
    });
