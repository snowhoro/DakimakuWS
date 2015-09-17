var mongoose = require('mongoose')
var Inventory = require('../models/Character_model');
var auth = require('../utils/authenticator');

module.exports.controller = function(app) {
    
    app.get('/createCharacter',auth.authAccount,function(req, res) {
          // any logic goes here
        var char = new Character();
    	  char.save(function (err) {
            if (err){
                res.send({msg:'', reason:err.code});
            }else{
              res.send({msg:'creado correctamente',user_id: char});
            }
          });
          
      });

};