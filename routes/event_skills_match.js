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
