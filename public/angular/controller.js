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

myApp.controller('SearchController',['$scope','$http', '$q', '$timeout','$mdDialog','$mdToast',function($scope,$http,$q, $timeout,$mdDialog,$mdToast){
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
            $scope.isOpen = false;
            refresh_chart(success.data.stats);
			   },function (error){
			   		console.log("Failure");
            $scope.progress_bar_flag = false;
            refresh_chart([]);
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
          $scope.isOpen = false;
          console.log(JSON.stringify(success.data.stats));
          // refresh_chart(success.data.stats);
       },function (error){
          console.log("Failure");
          $scope.progress_bar_flag = false;
          $scope.isOpen = false;
          refresh_chart([]);
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
    $scope.eventslist = ["walkathon","lunch"];

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

      console.log("test event"+$scope.event);
      if(typeof $scope.event == 'undefined' || $scope.event == 'None'){
        console.log("handle this case");
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
      }
      else{

        $http({
              method: 'GET',
              url: '/event_walk',
              params : searchobj
             }).then(function (success){
                console.log("Success");
                console.log(success.data);
                $superScope.volunteers_list = success.data.test;

             },function (error){
                console.log("Failure");
            });

      }




      $mdDialog.hide(answer);
    };
  }

  function MailDialogController($scope, $mdDialog, emailList) {
    //$scope.mail_recipient_list = ['tejasgujjar@gmail.com', 'tgusjjar','tejasgujjar@gmail.codm', 'tgujjar','tejadsgujjar@gmail.com', 'tguddjjar','tejasgujddjar@gmail.com', 'tgujddjar','tejasgvvujjar@gmail.com', 'tgujjvar','tejasgujjar@gmail.comv', 'tgujjavvr','tejasgxujjar@gmail.com', 'tguxxjjar'];
    $scope.mail_recipient_list = emailList;
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
      send_mail($scope.mail_recipient_list, $scope.mail_subject, $scope.mail_content);
    };
  }
  function TextDialogController($scope, $mdDialog, numberList) {
    //$scope.mail_recipient_list = ['tejasgujjar@gmail.com', 'tgusjjar','tejasgujjar@gmail.codm', 'tgujjar','tejadsgujjar@gmail.com', 'tguddjjar','tejasgujddjar@gmail.com', 'tgujddjar','tejasgvvujjar@gmail.com', 'tgujjvar','tejasgujjar@gmail.comv', 'tgujjavvr','tejasgxujjar@gmail.com', 'tguxxjjar'];
    $scope.text_recipient_list = numberList;
    // $scope.mail_subject = "GiveLight Foundation event reminder";
    var signature = "\n\nThanks and Regards, \nGiveLight Foundation"
    $scope.text_content = "Dear Volunteer, \n\nWe are organizing a fundraiser event near your place." + signature;

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
      send_sms($scope.text_recipient_list, $scope.mail_content);
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
  function get_all_emails(vol_list){
      var length = vol_list.length;
      var emails = [];
      for(var i=0;i < length; i++){
          if(vol_list[i]["Email Address"] != ""){
            emails.push(vol_list[i]["Email Address"]);
          }
      }
      // remove duplicates
      var unique_emails = emails.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
      })
      return unique_emails;
  }
  $scope.showMailTemplateC = function(ev, volunteer) {
    console.log("Show mail template dialog");
    var emails = [];
    if(volunteer == 'bulk'){
      console.log("Send bulk messages");
      emails = get_all_emails($scope.volunteers_list);
    }else{
      emails = [volunteer["Email Address"]]
    }
    $mdDialog.show({
      controller: MailDialogController,
      templateUrl: 'views/mail-dialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals:{
        emailList: emails
      },
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function get_all_numbers(vol_list){
      var length = vol_list.length;
      var emails = [];
      for(var i=0;i < length; i++){
          if(vol_list[i]["Contact Number"] != ""){
            emails.push(vol_list[i]["Contact Number"]);
          }
      }
      // remove duplicates
      var unique_emails = emails.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
      })
      return unique_emails;
  }
  $scope.showTextTemplate = function(ev, volunteer) {
    console.log("Show mail template dialog");
    var numbers = [];
    if(volunteer == 'bulk'){
      console.log("Send bulk text messages");
      numbers = get_all_numbers($scope.volunteers_list);
    }else{
      numbers = [volunteer["Contact Number"]]
    }
    $mdDialog.show({
      controller: TextDialogController,
      templateUrl: 'views/sms-dialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals:{
        numberList: numbers
      },
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
  $scope.get_default_search_results();
  //load_static_test_data();
  $scope.topDirections = ['left', 'up'];
   $scope.bottomDirections = ['down', 'right'];

   $scope.isOpen = false;

   $scope.availableModes = ['md-fling', 'md-scale'];
   $scope.selectedMode = 'md-fling';

   $scope.availableDirections = ['up', 'down', 'left', 'right'];
  $scope.selectedDirection = 'up';

  var chartOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: "Volunteer's Interests"
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Volunteers',
        colorByPoint: true,
        data: [{"name":"Governing","y":89},{"name":"Operations","y":76},{"name":"Marketing","y":23},{"name":"Human Resources","y":41},{"name":"Technology","y":36},{"name":"Programs/Outreach","y":22},{"name":"Global Homes","y":31}]
    }]
  };
  var volunteerChart = Highcharts.chart('container', chartOptions);
  function refresh_chart(data){
    volunteerChart.series[0].setData(data);
  }

  function send_mail(to, subject, content){
      var email_data = {
        "emaildata":{
          "mailids":to,
          "subject":subject,
          "body":content
        }
      }
      $scope.showSimpleToast('Sending email ...');
      console.log("sending mail: "+email_data);
      $http({
  		      method: 'POST',
  		      url: '/send_mail',
            data: email_data,
  			   }).then(function (success){
  			   		console.log("Success from email");
              var data = success.data;
  			   		console.log(data);
              $scope.showSimpleToast('Email sent successfully!');
  			   },function (error){
  			   		console.log("Failure");
              $scope.showSimpleToast('Error in sending emails!');
  			});
    }
    function send_sms(to, content){
      var sms_data = {
        "to":{
          "phone":to,
          "body":content
        }
      }
      $scope.showSimpleToast('Sending text message ...');
      console.log("sending sms: "+sms_data);
      return ;
      $http({
  		      method: 'POST',
  		      url: '/send_mail',
            data: sms_data,
  			   }).then(function (success){
  			   		console.log("Success from sms");
              var data = success.data;
  			   		console.log(data);
              $scope.showSimpleToast('Text message sent successfully!');
  			   },function (error){
  			   		console.log("Failure");
              $scope.showSimpleToast('Error in sending text message!');
  			});
    }
      var last = {
          bottom: true,
          top: false,
          left: false,
          right: true
        };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }
  $scope.showSimpleToast = function(msg) {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent(msg)
        .position(pinTo )
        .hideDelay(3000)
    );
  };
}]);
