
var checkstatus = function(req,res){
 console.log("lets check status");
     res
     .status(200)
     .json({"test":"test"});

};


exports.checkstatus = checkstatus;
