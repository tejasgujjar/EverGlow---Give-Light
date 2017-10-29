var NodeGeocoder = require('node-geocoder');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoSessionConnectURL = "mongodb://root:root@ds229435.mlab.com:29435/user_db";

locationquery = function get_lat_long(req,res){

// var address;
// if(city!=null){
//     address = city;
// }else if(state!=null){
//     address = state;
// }else {
//     address = country;
// }

var options = {
  provider: 'google',

 // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCMmLAeJIEBZ_Ckajl3IGGPiTfXSKAx-do', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

//var query = {"Name": { $ne:null } };
db.collection("user_db").find({"Name": { $ne:null }}).toArray(function(err,results){

           if(err) {

               console.log(err);
                return;
                }


   });
var geocoder = NodeGeocoder(options);

// Using callback
geocoder.geocode('San Jose', function(err, results) {
  console.log(res);
  res.status(200)
              .json({"field_details":results});

});


};

exports.locationquery = locationquery;
