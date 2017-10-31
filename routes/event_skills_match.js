var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://root:root@ds229435.mlab.com:29435/user_db";

var get_event_skills_match = function(req,res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
  if (err) throw err;
  var query = { $or: [ { "T":"Y" }, { "E":"Y" }  ] };
  db.collection("user_db").find(query).toArray(function(err, result) {
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

var get_event_location_match = function(req,res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
  if (err) throw err;
  var query = {
    "name": {
        "$regex": "walkathon",
        "$options": "i"
    }
};
  // db.collection("events_listr").find(query).toArray(function(err, result) {
  //   if(err) {
  //     console.log(err);
  //     return;
  //     }
if(req.query.search == "walkathon"){
      var query = { $or: [ { "E":"Y" }, { "D":"Y" }  ] };
      db.collection("user_db").find(query).toArray(function(err, ans1) {
        if(err) {
          console.log(err);
          return;
          }

          res
          .status(200)
          .json({"test":ans1});
           db.close();

      // res
      // .status(200)
      // .json({"test":result});
      //  db.close();
  });
}
else {
  var query = { $or: [ { "G":"Y" }, { "W":"Y" }  ] };
  db.collection("user_db").find(query).toArray(function(err, ans1) {
    if(err) {
      console.log(err);
      return;
      }

      res
      .status(200)
      .json({"test":ans1});
       db.close();
});
}
});
};

exports.get_event_skills_match = get_event_skills_match;
exports.get_event_location_match = get_event_location_match
