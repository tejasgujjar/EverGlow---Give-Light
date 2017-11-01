var NodeGeocoder = require('node-geocoder');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoSessionConnectURL = "mongodb://root:root@ds229435.mlab.com:29435/user_db";
var geolib = require('geolib');
var mongo = require('mongodb');



var options = {
  provider: 'google',

 // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCMmLAeJIEBZ_Ckajl3IGGPiTfXSKAx-do', // for Mapquest, OpenCage, Google Premier

  formatter: null         // 'gpx', 'string', ...
};



var testnear = function(req,res){


MongoClient.connect(mongoSessionConnectURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  myCollection = db.collection('user_db');

  myCollection.find()
  .toArray(function(err,ans1){

          if(err) {
            console.log(err);
            return;
            }


 var ind = 0;
            while(ind < 5){
              //for(var j in ans1[i].all_skills){
              console.log(ind);

                var geocoder = NodeGeocoder(options);
                console.log(ans1[ind].City);
                geocoder.geocode(ans1[ind].City, function(err, res) {
                  console.log(res);

                  if(typeof res != 'undefined'){
                    //console.log("========="+ans1[i]._id);
                    myCollection = db.collection('user_db');
                    MongoClient.connect(mongoSessionConnectURL, function(err, dbnew) {
                    var o_id = new mongo.ObjectID(ans1[ind]._id);
                    //console.log("res.latitude"+res[0].latitude);
                    //console.log("res.longitude"+res[0].longitude);
                    //,"longitude":res[0].longitude
                    console.log(ind);
                    console.log("id"+ans1[ind]._id);
                    //console.log("lattt"+res[0].latitude);
                    /*dbnew.collection("user_db").update({"_id":o_id},
                    {$set : {"latitude":res[0].latitude}}, function(err, data) {
                      if (err) throw err;
                      console.log("1 document updated"+data);
                      dbnew.close();
                    });*/


                    /*dbnew.collection('user_db').findAndModify({
                        query: {"_id":o_id},
                        update: {$set : {"latitude":res[0].latitude}},
                        new: true,
                        upsert: false
                        },
                        function(err, doc){
                            console.log(doc);
                    });*/


                  });

                }else{
                    console.log("+++++++++");
                  }

              });


              //}
              ind++;
            }



            res
            .status(200)
            .json({"test":ans1});
             db.close();
  });
});


// res
//               .status(200)
//               .json({"field_details":""});


}


var nearme = function(req,res){

MongoClient.connect(mongoSessionConnectURL, function(err, db) {
assert.equal(null, err);
console.log("Connected correctly to server.");


var city_users = db.collection("user_db").find({
"City":{
    $ne: ""
    }
}).toArray(function(err,results){

     if(err) {

            	console.log(err);
            	return;
            	}

    var name_city = {};

    for(var i = 0; i<results.length; i++){
        //console.log(results[i].Name);
        name_city[results[i].Name] = results[i].City;


    }

name_lat_long = {};

for(var city in name_city){
//console.log(name_city[city]);
    if(name_city[city] == ""){
        continue;
    }

     geocoder.geocode("San Jose", function(err, results) {
              console.log(results);
              if(typeof results == 'undefined'){

                  console.log("++++++++++++++++++");
              }else{
              //console.log(locations);
                //console.log(results[0].latitude);
                //sconsole.log(results[0].longitude);
                loc = {"latitude":results[0].latitude,"longitude":results[0].longitude};
                console.log(loc)

              }
            });

}

// console.log(name_lat_long);
res
              .status(200)
              .json({"field_details":name_lat_long});
               db.close();


});




// coords object
results = geolib.orderByDistance({latitude: 51.515, longitude: 7.453619}, {
    a: {latitude: 52.516272, longitude: 13.377722},
    b: {latitude: 51.518, longitude: 7.45425},
    c: {latitude: 51.503333, longitude: -0.119722}
});

//console.log(results);

final_results = {};
var count = 0;
for(var i = 0; i<results.length; i++){
    if(results[i].distance<500){
        console.log(results[i].distance);
    }


}


});
}


exports.testnear = testnear;
exports.nearme = nearme;
