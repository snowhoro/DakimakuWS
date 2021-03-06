var mongoose = require('mongoose')
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Account = require('../models/Account_model');
var auth = require('../utils/authenticator');

module.exports.controller = function(app) {

/**
 * a home page route
 */
  app.post('/signup', function(req, res) {
      // any logic goes here
      console.log(req.body.PlayerName);
    var acc = new Account({ PlayerName: req.body.PlayerName });
	  acc.save(function (err) {
        if (err){
          if (err.code == 11000){
            res.send({msg:'el id de usuario ya esta en uso en otra cuenta', reason:err.code});
          }else{
            res.send({msg:'ha ocurrido un error intente de nuevo mas tarde', reason:err.message});
          }

        }else{
          res.send({msg:'creado correctamente',user_id: acc._id});
        }
      });

  });

  app.get('/allAccounts',function(req,res){
        Account.find(function(err,data){
          if(err)
            return res.send(err);
          else
            return res.render('account_list',{allacc:data});
    });
 });
 
 app.post('/getAccount',auth.authAccount,function(req,res){
        Account.findOne({ _id : req.body.PlayerId },function(err,data){
            if(err)
              return res.send(err);
            else
              return res.send({account:data});
        });
 });


};

