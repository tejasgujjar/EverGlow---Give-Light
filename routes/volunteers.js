var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoSessionConnectURL = "mongodb://root:root@ds229435.mlab.com:29435/user_db";
//var prettyjson = require('prettyjson');

var checkstatus = function(req,res){
 console.log("lets check status");

     res
     .status(200)
     .json({"test":"test"});

};

var searchall = function(req,res){
  console.log("Inside searchAll");
  var docs = [];
  MongoClient.connect(mongoSessionConnectURL, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    myCollection = db.collection('user_db');
    //var cursor = myCollection.find();
    /*myCollection.find({"Name": "Elaf"},function(err, doc) {
         if (err) {
           console.log('Error: ', err);
         } else {
           console.log(doc);

         }

    });*/
    myCollection.find()
		.toArray(function(err,ans1){

            if(err) {

            	console.log(err);

            	//callback(true);
            	return;
            	}
              //console.log("returning from query",ans1);
              res
              .status(200)
              .json({"test":ans1});
               db.close();

    });



  });
};


exports.checkstatus = checkstatus;
exports.searchall = searchall;
