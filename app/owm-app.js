angular.module('OWMApp', ['ngRoute'])
    .value('owmCities', 
        ['New York', 'Dallas', 'Chicago'])
  .config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: './home.html',
            controller : 'HomeCtrl as home'
        })
        .when('/cities/:city', {
            templateUrl : './city.html',
            controller : 'CityCtrl as city',
            resolve : {
                city: function(owmCities, $route, $location) {
                    var city = $route.current.params.city;
                    console.log($route.current.params.city)
                    if(owmCities.indexOf(city) == -1 ) {
                      $location.path('/error');
                      return;
                    }
                    return city;
                }
            }
        })
        .when('/error', {
        template : '<p>Error, Page Not Found</p>'
    });
    })
    .controller('HomeCtrl', function() {
      vm = this;
      vm.welcomeMessage = "Welcome Home";
    })
    .controller('CityCtrl', function(city) {
      vm = this;
      vm.city = city;
  });