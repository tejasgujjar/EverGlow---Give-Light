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
console.log("Loading main page");

myApp.directive('regularCard', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/regularCard.tmpl.html',
      scope: {
        name: '@',
        address: '@',
        contactno: '@',
      }
    }
  })


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


   $http({
         method: 'GET',
         url: '/getlocationdetails'
        }).then(function (success){
           console.log("Success");
           console.log(success.data.test);
           for(var i =0;i<success.data.test.length;i++){
             //console.log(i);
             randomPoints.push({
               myId       : 'ultraId-' + _.uniqueId(),
               myPosition : {
                 lat : success.data.test[i].latitude,
                 lng : success.data.test[i].longitude
               },
               myCategory : ['nicePlaces', 'uglyPlaces', 'aliens'][_.random(2)]
             });
           }
        },function (error){
           console.log("Failure");
       });

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

myApp.controller('SearchController',['$scope','$http', '$q', '$timeout','$mdDialog',function($scope,$http,$q, $timeout,$mdDialog){
  console.log("search controller");
  $scope.search_simulateQuery = false;
  $scope.search_isDisabled    = false;

    // list of `state` value/display objects
    $scope.search_states        = loadAll();
    $scope.search_querySearch   = search_querySearch;
    $scope.search_selectedItemChange = search_selectedItemChange;
    $scope.search_searchTextChange   = search_searchTextChange;
    $scope.search_newState = search_newState;

    function search_newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function search_querySearch (query) {
      var results = query ? $scope.search_states.filter( createFilterFor(query) ) : $scope.search_states,
          deferred;
      if ($scope.search_simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function search_searchTextChange(text) {
      console.log('Text changed to ' + text);
    }

    function search_selectedItemChange(item) {
      console.log('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  $scope.volunteers_list = [];
  $scope.get_search_results = function(search_str){
    $http({
		      method: 'GET',
		      url: '/searchall?search='+search_str
			   }).then(function (success){
			   		console.log("Success");
			   		console.log(success.data);
            $scope.volunteers_list = success.data.test;
			   },function (error){
			   		console.log("Failure");
				});
  }
//searchhome

  function FilterDialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
  $scope.entered_search = function(){
    console.log("searched val: "+$scope.search_val);
    $scope.get_search_results($scope.search_val);
  }
  $scope.showAdvanced = function(ev) {
    console.log("Show advanced filter dialog");
    $mdDialog.show({
      controller: FilterDialogController,
      templateUrl: 'views/filter-dialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
}]);
