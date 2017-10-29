var myApp = angular.module('myApp',['ngRoute', 'ngMaterial']);

myApp.config(function($routeProvider) {
   $routeProvider
   .when('/',{
     templateUrl: 'views/main.html',
      controller: 'HomeController'
   })
   .when('/search', {
     templateUrl: 'views/search.html',
     controller: 'SearchController',
   })
});
console.log("Loading main page");
myApp.controller('HomeController',['$scope','$http','$location',function($scope,$http,$location){
  console.log("directory controller");
  $scope.go = function ( path ) {
  $location.path( path );
};
}]);

myApp.controller('SearchController',['$scope','$http',function($scope,$http){
  console.log("search controller");
}]);
