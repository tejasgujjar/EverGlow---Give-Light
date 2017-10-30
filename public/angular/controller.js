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

// myApp.directive('regularCard', function () {
//     return {
//       restrict: 'E',
//       templateUrl: 'views/regularCard.tmpl.html',
//       scope: {
//         name: '@',
//         address: '@',
//         contactno: '@',
//         showMailTemplateC: "&showMailTemplateC"
//       },
//       link:function(scope){
//         scope.mailtemplate = function(ev){
//             console.log('directive mail click');
//             scope.showMailTemplateC({msg:"TEST MSG"});
//         };
//       }
//     }
//   })


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
  $scope.volunteers_list = [];
  var testdata = [{"_id":"59f57a8d8a207563dd30dc3c","Name":"Elaf","Email Address":"lofa87@hotmail.com","Status":"","Sign up Date":42795,"Contact Number":6692219431,"City":"San Jose","State":"CA","Country":"USA","Email Received":"","Status2":"Contacted","Last Status Date":42404,"Owner":"Ansa","Proposed GL Team":"Event Planning","Profession":"","Special Passion":"","T":"","E":"","G":"","D":"","M":"","W":"","P":""},{"_id":"89f57a8d8a207563dd30dc3c","Name":"Tejas","Email Address":"lofa87@hotmail.com","Status":"","Sign up Date":42795,"Contact Number":6692219431,"City":"San Jose","State":"CA","Country":"USA","Email Received":"","Status2":"Contacted","Last Status Date":42404,"Owner":"Ansa","Proposed GL Team":"Event Planning","Profession":"","Special Passion":"","T":"","E":"","G":"","D":"","M":"","W":"","P":""}];


  $scope.get_search_results = function(search_str){
    $http({
		      method: 'GET',
		      url: '/searchall?search='+search_str
			   }).then(function (success){
			   		console.log("Success");
            var data = success.data;
            var singleobj = data.test[0]
			   		console.log(data);
            $scope.volunteers_list = success.data.test;
			   },function (error){
			   		console.log("Failure");
				});
  }

$scope.get_default_search_results = function(){
  $http({
        method: 'GET',
        url: '/searchhome'
       }).then(function (success){
          console.log("Success");
          var data = success.data;
          var singleobj = data.test[0];
          console.log(JSON.stringify(singleobj));
          console.log(success.data);
          $scope.volunteers_list = success.data.test;
       },function (error){
          console.log("Failure");
      });
}

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

  function MailDialogController($scope, $mdDialog) {
    //$scope.mail_recipient_list = ['tejasgujjar@gmail.com', 'tgusjjar','tejasgujjar@gmail.codm', 'tgujjar','tejadsgujjar@gmail.com', 'tguddjjar','tejasgujddjar@gmail.com', 'tgujddjar','tejasgvvujjar@gmail.com', 'tgujjvar','tejasgujjar@gmail.comv', 'tgujjavvr','tejasgxujjar@gmail.com', 'tguxxjjar'];
    $scope.mail_recipient_list = ['tejasgujjar@gmail.com', 'tgusjjar','tejasgujjar@gmail.codm'];
    $scope.mail_subject = "GiveLight Foundation event reminder";
    var signature = "\n\nThanks and Regards, \nGiveLight Foundation"
    $scope.mail_content = "Dear Volunteer, \n\nWe are organizing a fundraiser event near your place." + signature;

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
  $scope.showMailTemplateC = function(ev) {
    console.log("Show mail template dialog");
    $mdDialog.show({
      controller: MailDialogController,
      templateUrl: 'views/mail-dialog.tmpl.html',
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
  function load_static_test_data(){
    $scope.volunteers_list = testdata;
  }
  //$scope.get_default_search_results();
  load_static_test_data();
}]);
