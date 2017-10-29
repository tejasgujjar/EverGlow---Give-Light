

var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var mongoURL = 'mongodb://suhas262:everglow2017@ds229435.mlab.com:29435/user_db';
var connectionList = [];
var requestList = [];

  /*Returns the collection on the selected database*/

exports.collection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    }
    return db.collection(name);
};

var connPool = [];

function addnewconnectionobjectTopool(){
    return MongoClient.connect(mongoURL, function(err, _db){
        console.log("Creating a new connection in the pool with MongoDB at : "+mongoURL);
        if (err) { throw new Error('Could not connect: '+err); }
        db = _db;
        // Adding the connection to the pool.
        connPool.push(db);
        connected = true;
        console.log(connected +" is connected?");
    });
}

var dbPool = {
    "maxPoolSize": 100
};
/*
*   Creating the connection  pool of 5*10=50
* */
exports.createrconnectionpool = function createrconnectionpool(){
    for(var i = 0; i < dbPool.maxPoolSize; i++){
        addnewconnectionobjectTopool();
    }
};

/**
 * Connects to the MongoDB Database with the provided URL
 */
exports.connect = function(callback){

    if(connPool.length > 0){
        callback(connPool.pop());
    } else {
        console.log("Pool empty. Filling connection pool");
        this.createrconnectionpool();
        callback(connPool.pop());
    }
    console.log("pool connection length: "+connPool.length);

};
