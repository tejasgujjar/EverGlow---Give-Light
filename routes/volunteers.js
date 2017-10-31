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

    myCollection.find({$or: [ {all_skills: {$elemMatch: {'$regex': searchString,$options:'i'}}},
       { "City": {'$regex': searchString,$options:'i'}}, { "Name": {'$regex': searchString,$options:'i'} },
            { "Contact Number": {'$regex': searchString,$options:'i'} }]})
    //myCollection.find()
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

var searchadvanced= function(req,res){
  console.log("Inside searchadvanced");
  console.log(req.query);
  //var obj = JSON.parse(req.query);
  var obj = req.query;
  console.log(obj);
  searchcity = obj.city.toLowerCase();

  MongoClient.connect(mongoSessionConnectURL, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    myCollection = db.collection('user_db');

    var searchCity = obj.city.toLowerCase();
    searchCity = searchCity == "" ? "987654321" : searchCity;
    var searchGoverning =  obj.gover == "" ? "1":"Governing";
    var searchOper =  obj.oper== "" ? "1":"Operations";
    var searchMarket =  obj.market== "" ? "1":"Marketing";
    var searchHuman =  obj.human== "" ? "1":"Human Resources";
    var searchTech =  obj.tech== "" ? "1":"Technology";
    var searchProg =  obj.prog== "" ? "1":"Programs/Outreach";
    var searchGlobal =  obj.global== "" ? "1":"Global Homes";

    myCollection.find({ $and:[ {$or: [ {all_skills: {$elemMatch: {'$regex': searchGoverning,$options:'i'}}},
                                       {all_skills: {$elemMatch: {'$regex': searchOper,$options:'i'}}},
{all_skills: {$elemMatch: {'$regex': searchMarket,$options:'i'}}},
{all_skills: {$elemMatch: {'$regex': searchHuman,$options:'i'}}},
{all_skills: {$elemMatch: {'$regex': searchTech,$options:'i'}}},
{all_skills: {$elemMatch: {'$regex': searchProg,$options:'i'}}},
{all_skills: {$elemMatch: {'$regex': searchGlobal,$options:'i'}}}
                                     ]},
                    { "City": {'$regex': searchCity,$options:'i'} }   ]})

    /*myCollection.find({ $and:[ {$or: [ {all_skills: {$elemMatch: {'$regex': searchGoverning,$options:'i'}}}
  ]}   ]})*/
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
                "count" : gover
              },
              {
                "name" : "Operations",
                "count" : oper
              },
              {
                "name" : "Marketing",
                "count" : market
              },
              {
                "name" : "Human Resources",
                "count" : human
              },
              {
                "name" : "Technology",
                "count" : tech
              },
              {
                "name" : "Programs/Outreach",
                "count" : prog
              },
              {
                "name" : "Global Homes",
                "count" : globalSkill
              }]

              res
              .status(200)
              .json({"test":ans1,"stats":stats});
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
exports.searchadvanced = searchadvanced;
exports.checkstatus = checkstatus;
exports.searchall = searchall;
exports.searchone = searchone;
exports.searchhome = searchhome;
