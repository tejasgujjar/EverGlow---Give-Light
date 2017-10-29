var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider) {
   $routeProvider
   .when('/',{
      controller  : 'directoryController'
   })
});

myApp.controller('directoryController',['$scope','$http',function($scope,$http){
}]);
