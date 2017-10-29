var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://root:root@ds229435.mlab.com:29435/user_db";

var checkstatus = function(req,res){
  console.log("mongo check status");

  res
  .status(200)
  .json({"test":"test"});
};

var mongo_search = function(req,res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
  if (err) throw err;
  var query = { "start_date": { $gte: new Date("2020-12-22T00:00:00Z").toISOString() } };
  db.collection("events").find(query).toArray(function(err, result) {
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
exports.mongo_search = mongo_search;
