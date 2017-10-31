var myApp = angular.module('myApp',['ngRoute', 'ngMaterial','madvas.angular-globe', 'ngtweet']);

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


myApp.controller('HomeController',['$scope','$http','$location','$mdDialog',function($scope,$http,$location,$mdDialog){
  $scope.go = function ( path ) {
    $location.path( path );
  };

  //starts
  $scope.showAdvanced = function() {
    $mdDialog.show({
      controller: 'HomeController',
      templateUrl: 'views/about.html',
      clickOutsideToClose:true,
    })
  };
  $scope.cancel = function() {
      $mdDialog.cancel();
    };
  $scope.showContact = function() {
      $mdDialog.show({
        controller: 'HomeController',
        templateUrl: 'views/contactus.html',
        clickOutsideToClose:true,
      })
    };
    $scope.showDyk = function() {
        $mdDialog.show({
          controller: 'HomeController',
          templateUrl: 'views/didYouKnow.html',
          clickOutsideToClose:true,
        })
      };
      $scope.showform = function() {
          $mdDialog.show({
            controller: 'HomeController',
            templateUrl: 'views/mainForm.html',
            clickOutsideToClose:true,
          })
        };
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      });

  //ends



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

  $scope.progress_bar_flag = false;
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
            $scope.progress_bar_flag = false;
			   },function (error){
			   		console.log("Failure");
            $scope.progress_bar_flag = false;
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
          $scope.progress_bar_flag = false;
       },function (error){
          console.log("Failure");
          $scope.progress_bar_flag = false;
      });
}
  $superScope = $scope;
  function FilterDialogController($scope, $mdDialog) {
    //var vm = $scope;
    //vm.location1 = "ashadjkj";
    $scope.gover = false;
    $scope.oper = false;
    $scope.market = false;
    $scope.human = false;
    $scope.tech = false;
    $scope.prog = false;
    $scope.global =false;
    $scope.city = "";

    this.parent = $scope;
    var myscope  = $scope;

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {

      console.log("Tets"+$scope.city);
      console.log("Tets"+$scope.gover);
      console.log("Tets"+$scope.oper);
      console.log("Tets"+$scope.market);
      console.log("Tets"+$scope.human);
      console.log("Tets"+$scope.tech);
      console.log("Tets"+$scope.prog);
      console.log("Tets"+$scope.global);

      searchobj = {
        "city" : $scope.city == "" ? "" : $scope.city,
        "gover" : $scope.gover == "" ? "" : $scope.gover,
        "oper" : $scope.oper == "" ? "" : $scope.oper,
        "market" : $scope.market == "" ? "" : $scope.market,
        "human" : $scope.human == "" ? "" : $scope.human,
        "tech" : $scope.tech == "" ? "" : $scope.tech,
        "prog" : $scope.prog == "" ? "" : $scope.prog,
          "global" : $scope.global == "" ? "" : $scope.global
      }


      $http({
            method: 'GET',
            url: '/searchadvanced',
            params : searchobj
           }).then(function (success){
              console.log("Success");
              console.log(success.data);
              $superScope.volunteers_list = success.data.test;

           },function (error){
              console.log("Failure");
          });

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

  function ProfileDialogController($scope, $mdDialog, volunteerDetail){
    var volunteer = volunteerDetail;
    console.log("Profile controller: "+volunteer.Name);


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
    $scope.progress_bar_flag = true;
    $scope.get_search_results($scope.search_val);
  }
  $scope.showProfile = function(ev, volunteer){
      console.log('show profile pic');
      console.log("Show advanced filter dialog");
      $mdDialog.show({
        controller: ProfileDialogController,
        templateUrl: 'views/profile-dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals:{
          volunteerDetail: volunteer
        },
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
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
