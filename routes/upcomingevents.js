var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://root:root@ds229435.mlab.com:29435/user_db";

var checkstatus = function(req,res){
  console.log("mongo check status");

  res
  .status(200)
  .json({"test":"test"});
};

var get_future_events = function(req,res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
  if (err) throw err;
  var query = { "start_time": { $gte: new Date("2017-10-29T11:30:00-0800").toISOString() } };
  db.collection("events_listr").find(query).toArray(function(err, result) {
    if(err) {
      console.log(err);
      return;
      }

      res
      .status(200)
      .json({"test":result});
       db.close();
  });
});
};

var get_past_events = function(req,res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
  if (err) throw err;
  var query = { "start_time": { $lte: new Date("2017-10-29T11:30:00-0800").toISOString() } };
  db.collection("events_listr").find(query).toArray(function(err, result) {
    if(err) {
      console.log(err);
      return;
      }

      res
      .status(200)
      .json({"test":result});
       db.close();
  });
});
};

exports.checkstatus = checkstatus;
exports.get_future_events = get_future_events;
exports.get_past_events = get_past_events;
