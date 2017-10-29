var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider) {
   $routeProvider
   .when('/',{
      controller  : 'directoryController'
   })
   .when('/search',{
      templateUrl: "templates/search.html",
      controller  : 'searchController'
   })
});

myApp.controller('directoryController',['$scope','$http',function($scope,$http){
  console.log("directoryController");
}]);


myApp.controller('searchController',['$scope','$http',function($scope,$http){
  console.log("searchController");
}]);
