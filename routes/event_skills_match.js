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
console.log(req.query.search);
  // db.collection("events_listr").find(query).toArray(function(err, result) {
  //   if(err) {
  //     console.log(err);
  //     return;
  //     }
if(req.query.search == "walkathon"){
     console.log("Inside if");
      var query = { $or: [ { "E":"Y" }, { "D":"Y" }  ] };
      db.collection("user_db").find(query).toArray(function(err, ans1) {
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

      // res
      // .status(200)
      // .json({"test":result});
      //  db.close();
  });
}
else {
  console.log("Inside else");
  var query = { $or: [ { "G":"Y" }, { "W":"Y" }  ] };
  db.collection("user_db").find(query).toArray(function(err, ans1) {
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
}
});
};

exports.get_event_skills_match = get_event_skills_match;
exports.get_event_location_match = get_event_location_match
