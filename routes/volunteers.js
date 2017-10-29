var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoSessionConnectURL = "mongodb://root:root@ds229435.mlab.com:29435/user_db";
//var prettyjson = require('prettyjson');
var mongo = require('mongodb');

var checkstatus = function(req,res){
 console.log("lets check status");

     res
     .status(200)
     .json({"test":"test"});

};


//localhost:3000/searchall?search=Elaf
var searchall = function(req,res){
  console.log("Inside searchAll");
  console.log(req.query.search);

  MongoClient.connect(mongoSessionConnectURL, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    myCollection = db.collection('user_db');

    myCollection.find({$or: [ { "City": req.query.search}, { "Name": req.query.search },{ "Contact Number": req.query.search }]})
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
};


var searchhome = function(req,res){
  console.log("Inside searchhome");
  //console.log(req.query.search);

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

              res
              .status(200)
              .json({"test":ans1});
               db.close();
    });
  });
};

//localhost:3000/searchone?id=59f57a8d8a207563dd30dc3d
var searchone = function(req,res){
  console.log("Inside id");
  console.log(req.query);
  var o_id = new mongo.ObjectID(req.query.id);
  MongoClient.connect(mongoSessionConnectURL, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    myCollection = db.collection('user_db');

    myCollection.find({"_id":o_id})
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
};

exports.checkstatus = checkstatus;
exports.searchall = searchall;
exports.searchone = searchone;
exports.searchhome = searchhome;
