var NodeGeocoder = require('node-geocoder');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoSessionConnectURL = "mongodb://root:root@ds229435.mlab.com:29435/user_db";

locationquery = function get_lat_long(req,res){


var options = {
  provider: 'google',

 // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCMmLAeJIEBZ_Ckajl3IGGPiTfXSKAx-do', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};



var geocoder = NodeGeocoder(options);


MongoClient.connect(mongoSessionConnectURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  myCollection = db.collection('user_db');
  myDeleteLocations = db.collection('locations');
  myDeleteLocations.remove();

  myCollection.distinct( "City", function(err,ans1){
  locations = [];

          if(err) {
            console.log(err);
            return;
            }
            //console.log(ans1);
        for(var i = 0; i < ans1.length; i++){
            //console.log("-----------------");

            if(typeof ans1[i] != 'undefined' && ans1[i] != ""){
              //console.log("-----------------");
            geocoder.geocode(ans1[i], function(err, results) {
              myLocations = db.collection('locations');
              if(results == 'undefined'){

                console.log("++++++++++++++++++");
            }else{
            //console.log(locations);
              //console.log(results[0].latitude);
              //sconsole.log(results[0].longitude);
              loc = {"latitude":results[0].latitude,"longitude":results[0].longitude};
              //locations.push(loc);
              myLocations.insert(loc);
              console.log("Done uploading");
            }
            });
          }

          }

          res.status(200)
                      .json({"field_details":locations});

  });
});

locations = [];
// Using callback

};

getlocationquery = function get_lat_long(req,res){
  console.log("Inside getlocationquery");
  //console.log(req.query.search);

  MongoClient.connect(mongoSessionConnectURL, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    myCollection = db.collection('locations');

    myCollection.find()
    .toArray(function(err,ans1){

            if(err) {
              console.log(err);
              return;
              }

              res
              .status(200)
              .json({"test":ans1});
               db.close();
    });
  });

}

exports.getlocationquery = getlocationquery;
exports.locationquery = locationquery;
