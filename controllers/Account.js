var mongoose = require('mongoose')
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Account = require('../models/Account_model');
var auth = require('../utils/authenticator');

module.exports.controller = function(app) {

/**
 * a home page route
 */
  app.get('/signup', function(req, res) {
      // any logic goes here
    var acc = new Account({ PlayerName: req.query.PlayerName });
	  acc.save(function (err) {
        if (err){
          if (err.code == 11000){
            res.send({msg:'el id de usuario ya esta en uso en otra cuenta', reason:err.code});
          }else{
            res.send({msg:'ha ocurrido un error intente de nuevo mas tarde', reason:err.code});
          }
          
        }else{
          res.send({msg:'creado correctamente',user_id: acc._id});
        }
      });
      
  });
  
  app.post('/authenticate', function(req,res){
    auth.authAccount({id : req.query.PlayerId }, function(err,done){
      if(err){
        res.send(err.errorMsg);
      }
      else
        res.send(done);
    });
  });
  
  app.get('/allAccounts',auth.authAccount,function(req,res){
        Account.find(function(err,data){
          res.render('account_list',{allacc:data});
    });
 });     


}