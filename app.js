var express = require('express');
var session = require('express-session');//session testing
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var mongoose = require('mongoose');


var routes = require('./routes/index');
var vol = require('./routes/volunteers.js');
var email = require('./routes/email.js');
var upcomingevents = require('./routes/upcomingevents.js');
var locationdetails = require('./routes/getlocation.js');
var http = require('http');
var app = express();
var mongoSessionConnectURL = "mongodb://root:root@ds229435.mlab.com:29435/user_db";
//

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

var field_search = require('./routes/field_search');


app.get('/new-page', function(req, res) {
       //res.render('views/new.ejs'); // load the single view file (angular will handle the page changes on the front-end)
       res.render('new');
   });

 app.get('/search', function(req, res) {
        //res.render('views/new.ejs'); // load the single view file (angular will handle the page changes on the front-end)
        res.render('search');
    });

app.get('/', function(req, res) {
       //res.render('views/new.ejs'); // load the single view file (angular will handle the page changes on the front-end)
       res.render('index', { title: 'Express' });
   });

app.get('/check-status',vol.checkstatus);

app.post('/send_mail',email.email_check);
app.get('/searchall',vol.searchall);
app.get('/searchone',vol.searchone);

app.get('/field_details',field_search.field_details);

app.get('/mongo_check',upcomingevents.checkstatus);
app.get('/mongo_search',upcomingevents.mongo_search);
app.get('/locationdetails',locationdetails.locationquery);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
/*
mongoose.connect(mongoSessionConnectURL, function(){
  console.log('Connected to mongo at: ' + mongoSessionConnectURL);
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});
*/

/*MongoClient.connect(mongoSessionConnectURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});*/
