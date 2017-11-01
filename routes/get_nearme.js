var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoSessionConnectURL = "mongodb://root:root@ds229435.mlab.com:29435/user_db";
//var prettyjson = require('prettyjson');
var mongo = require('mongodb');

console.log("Hitting  this");
	var getnearmeusers= function(req,res){
  console.log("Entering this");

	MongoClient.connect(mongoSessionConnectURL, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    myCollection = db.collection('user_db');
	searchCity = "San Jose";



	myCollection.find({ "City": {'$regex': searchCity,$options:'i'} })
  .toArray(function(err,ans1){

            if(err) {
            	console.log(err);
            	return;
            	}

              var gover = 0;
              var oper = 0;
              var market = 0;
              var human = 0;
              var tech = 0;
              var prog = 0;
              var globalSkill = 0;
              for(var i in ans1){
                for(var j in ans1[i].all_skills){

                  if(ans1[i].all_skills[j] == "Governing") gover++;
                  if(ans1[i].all_skills[j] == "Operations") oper++;
                  if(ans1[i].all_skills[j] == "Marketing") market++;
                  if(ans1[i].all_skills[j] == "Human Resources") human++;
                  if(ans1[i].all_skills[j] == "Technology") tech++;
                  if(ans1[i].all_skills[j] == "Programs/Outreach") prog++;
                  if(ans1[i].all_skills[j] == "Global Homes") globalSkill++;
                }
              }

              var stats = [{
                "name" : "Governing",
                "y" : gover
              },
              {
                "name" : "Operations",
                "y" : oper
              },
              {
                "name" : "Marketing",
                "y" : market
              },
              {
                "name" : "Human Resources",
                "y" : human
              },
              {
                "name" : "Technology",
                "y" : tech
              },
              {
                "name" : "Programs/Outreach",
                "y" : prog
              },
              {
                "name" : "Global Homes",
                "y" : globalSkill
              }]

              res
              .status(200)
              .json({"test":ans1,"stats":stats});

               db.close();
    });
  });
};


exports.getnearmeusers = getnearmeusers;
