var myApp = angular.module('myApp',['ngRoute', 'ngMaterial','madvas.angular-globe']);

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
//console.log("Loading main page");
myApp.controller('HomeController',['$scope','$http','$location',function($scope,$http,$location){
  $scope.go = function ( path ) {
  $location.path( path );
};




/* @ngInject */
function AdvancedCtrl() {
  /* jshint validthis: true */
  var vm = this;
  $scope.speed = 3;
  $scope.getPointClass = getPointClass;
  $scope.getPointRadius = getPointRadius;
  activate();
$scope.test = "yashas";
  ////////////////

  function activate() {
    console.log("lets testttt");
    /*var randomPoints = _.map(_.range(30), function() {
      console.log("test");
      return {
        myId       : 'ultraId-' + _.uniqueId(),
        myPosition : {
          lat : 40.748817,
          lng : -73.985428
        },
        myCategory : ['nicePlaces', 'uglyPlaces', 'aliens'][_.random(2)]
      };
    });*/

   randomPoints = [{
     myId       : 'ultraId-' + _.uniqueId(),
     myPosition : {
       lat : 40.748817,
       lng : -73.985428
     },
     myCategory : ['nicePlaces', 'uglyPlaces', 'aliens'][_.random(2)]
   },{
     myId       : 'ultraId-' + _.uniqueId(),
     myPosition : {
       lat : 37.773972,
       lng : -122.431297
     },
     myCategory : ['nicePlaces', 'uglyPlaces', 'aliens'][_.random(2)]
   }];

    $scope.points = [
      {
        values : randomPoints
      }
    ];
  }

  /*$scope.points = [
    {
      values : {
        myId       : 'ultraId-' + _.uniqueId(),
        myPosition : {
          lat : 40.748817,
          lng : -73.985428
        },
        myCategory : ['nicePlaces', 'uglyPlaces', 'aliens'][_.random(2)]
      }
    }
  ];*/

  function getPointRadius(d) {
    return d.myCategory.length;
  }

  function getPointClass(d) {
    return d.myCategory;
  }
}

AdvancedCtrl();

}]);

myApp.controller('SearchController',['$scope','$http',function($scope,$http){
  console.log("search controller");
}]);
