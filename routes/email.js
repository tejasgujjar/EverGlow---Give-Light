var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'edkali7977@gmail.com',
    pass: 'apachertr'
  }
});
/*
{"emaildata" :
          {"mailids": ["nishant.apatil3@gmail.com", "yashasm1991@gmail.com"],
           "subject": "Invitation",
            "body": "Inviting all"}}
        */

var email_check = function(req,res){
 console.log("email test");
 console.log(req.body.emaildata.mailids);
 console.log(req.body.emaildata.subject);
 console.log(req.body.emaildata.body);
 var mailOptions = {
   from: 'edkali7977@gmail.com',
  //  to: req.body.emaildata.mailids,
   to: ['tejasgujjar@gmail.com', "nishant.apatil3@gmail.com", "yashasm1991@gmail.com", "kushal.d.joshi@gmail.com", ''],
   subject: req.body.emaildata.subject,
   text: req.body.emaildata.body
 };

 transporter.sendMail(mailOptions, function(error, info){
   if (error) {
     console.log(error);
   } else {
     console.log('Email sent: ' + info.response);
   }
 });

    res
     .status(200)
     .json({"test":"test"});

};

exports.email_check=email_check;
