angular.module('OWMApp', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : 'app/home.html',
            controller : 'HomeCtrl'
        });
    })
    .controller('HomeCtrl', function($scope) {
        //empty for now
    });;