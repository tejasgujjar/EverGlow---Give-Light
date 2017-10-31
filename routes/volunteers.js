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
  searchString = req.query.search.toLowerCase();

  MongoClient.connect(mongoSessionConnectURL, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    myCollection = db.collection('user_db');

    var searchString = req.query.search;

    myCollection.find({$or: [ {all_skills: {$elemMatch: {'$regex': searchString,$options:'i'}}},{ "City": {'$regex': searchString,$options:'i'}}, { "Name": {'$regex': searchString,$options:'i'} },{ "Contact Number": {'$regex': searchString,$options:'i'} }]})
    //myCollection.find()
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
/*
var temp = function(req,res){
  MongoClient.connect(mongoSessionConnectURL, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    myCollection = db.collection('user_db');
    //var o_id = new mongo.ObjectID(req.query.id);
    //{"_id":o_id}
    myCollection.find()
    .toArray(function(err,ans1){

            if(err) {
              console.log(err);
              return;
              }
              for(var obj in ans1){
                 //console.log(ans1[obj]);

                 var all_skills = [];
                 if(ans1[obj].T == "Y") all_skills.push("Governing");
                 if(ans1[obj].E == "Y") all_skills.push("Operations");
                 if(ans1[obj].G == "Y") all_skills.push("Marketing");
                 if(ans1[obj].D == "Y") all_skills.push("Human Resources");
                 if(ans1[obj].M == "Y") all_skills.push("Technology");
                 if(ans1[obj].W == "Y") all_skills.push("Programs/Outreach");
                 if(ans1[obj].P == "Y") all_skills.push("Global Homes");
                 ans1[obj].all_skills = all_skills;
                 //MongoClient.connect(mongoSessionConnectURL, function(err, dbnew) {
                 //updateCollection = dbnew.collection('user_db');
                 var o_id = new mongo.ObjectID(ans1[obj]._id);
                 //updateCollection.update({"_id":o_id},ans1[obj]);
                 //dbnew.collection("user_db").updateOne({"_id":o_id}, {$set : {"all_skills":all_skills}}, function(err, res) {
                 db.collection("user_db").updateOne({"_id":o_id}, {$set : {"all_skills":all_skills}}, function(err, res) {
                   if (err) throw err;
                   console.log("1 document updated"+res);
                   //dbnew.close();
                 });

               //});
                 //break;
              }

              res
              .status(200)
              .json({"test":"test"});
               db.close();
    });
  });*/


//exports.temp = temp;
exports.checkstatus = checkstatus;
exports.searchall = searchall;
exports.searchone = searchone;
exports.searchhome = searchhome;
