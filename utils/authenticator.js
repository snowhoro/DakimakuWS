var mongoose = require('mongoose')
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Account = require('../models/Account_model');


exports.authAccount = function(req,res,next){
   Account.findOne({_id : req.query.PlayerId}, function(err,result){
     if(err){
        return res.send(err.errorMsg);
      }else{
        if(!result){  // Vacio
          return res.send('User Not Found');
        }else{
          console.log("user verified");
          next();
        }
      }
  });
}
