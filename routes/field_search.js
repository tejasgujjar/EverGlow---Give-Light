var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoSessionConnectURL = "mongodb://root:root@ds229435.mlab.com:29435/user_db";


var field_details = function(req,res){
    
    console.log(req.query.user_details.name);
    user_obj = JSON.parse(req.query.user_details);
    console.log(user_obj.Name);
	
    query_obj = {};
   

    for(var attributename in user_obj){
        console.log(attributename+": "+user_obj[attributename]);
	 
	if(user_obj[attributename] != ""){
            console.log("Inside loop"+ user_obj[attributename]);
			query_obj[attributename] = user_obj[attributename];
            console.log(query_obj[attributename]);
	   }
	
	}
    
	
	
    MongoClient.connect(mongoSessionConnectURL, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    
    console.log(query_obj);

    db.collection("user_db").find(query_obj).toArray(function(err,results){

            if(err) {

            	console.log(err);
            	return;
            	}
              
              res
              .status(200)
              .json({"field_details":results});
               db.close();

    });
	
  });
};


exports.field_details = field_details;
