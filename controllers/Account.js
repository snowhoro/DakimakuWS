var mongoose = require('mongoose')
var Account = require('../models/Account_model');
module.exports.controller = function(app) {

/**
 * a home page route
 */
  app.get('/signup', function(req, res) {
      // any logic goes here
    var acc = new Account({ PlayerName: req.query.PlayerName });
	  acc.save(function (err) {
        if (err){
          res.send(err);
        }else{
          res.send('creado correctamente');
        }
      });
      
  });


app.get('/allAccounts',function(req,res){
  Account.find(function(err,data){
    res.send(data);
  });
});

}