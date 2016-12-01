var module = angular.module("myapp", ['ngRoute']);

module.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'routes/notes/notes.html',
        controller: 'NotesCtrl'
    }).when('/section/:name', {
        templateUrl: 'routes/viewSection/viewSection.html',
        controller: 'ViewSectionController'
    }).when('/register', {
            templateUrl: 'routes/userForm/userForm.html',
            controller: 'UserFormCtrl'
    }).when('/:section?', {
        templateUrl: 'routes/notes/notes.html',
        controller: 'NotesCtrl'
    }).otherwise({
        redirectTo: '/'
    })


});
