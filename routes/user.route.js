var express = require("express");
var router = express.Router();
var users = require("../models/user.model");

router.post("/login", function(req, res) {
  var user = {
   userid:  req.body.emailid.toLowerCase(),
   password: req.body.password.toLowerCase(),
  }
  users.findOne({'Email': user.userid}, (err, response) => {
    if (response) {
      res.send({
        Status: 200,
        Info: "Login Success",
        UserId: response.UserId,
        FirstName: response.FirstName,
        LastName: response.LastName,
        EmailId: response.Email
      });
    } else if(err){
    console.log(err)
    }
    else{
      res.send({
        Info: "User not found"
      });
    }
  });
});

module.exports = router;
