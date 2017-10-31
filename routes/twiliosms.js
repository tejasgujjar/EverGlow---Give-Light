const client = require('twilio')(
  "AC03a785ec44ed0d0c406b95919395d70d",
  "auth token"
);

var send_sms = function(req,res){
   console.log("sending sms");
   console.log(req.body.to.phone);
   console.log(req.body.to.body);
/*
{"to" :
{"phone": ["6693507484", "4086809578"],
"body": "Invitation givelight"
}}
*/
var arr = req.body.to.phone;
arr.forEach(function(value){console.log(value);
client.messages.create({
    from: "9472224714", //from number
    to: value, //sending number
    body: req.body.to.body
}, function(err,message){
    console.log(err);
});
});

res
 .status(200)
 .json({"sms":"success"});

};

exports.send_sms = send_sms;
