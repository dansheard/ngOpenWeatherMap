angular.module('OWMApp', ['ngRoute', 'ngAnimate'])
  .value('owmCities', 
      ['New York', 'Dallas', 'Chicago'])
  .config(function($routeProvider) {
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

  .run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
      $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
      $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 1000);
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