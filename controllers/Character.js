var mongoose = require('mongoose')
var Inventory = require('../models/Character_model');
var auth = require('../utils/authenticator');

module.exports.controller = function(app) {
    
    app.post('/createCharacter',auth.authAccount,function(req, res) {
          // any logic goes here
        var char = new Character({  Name: req.body.CharacterName });
    	  char.save(function (err) {
            if (err){
                res.send({msg:'', reason:err.code});
            }else{
              res.send({msg:'creado correctamente', char_id: char});
            }
          });
          
      });
      
    app.post('getCharacter',auth.authAccount, function(req,res){
       Character.find({ _id: req.body.CharacterId })
                 .populate('Characters.MaxChar','Name')
                 .populate('InventoryID','PlayerName')
                 .exec(function(err,data){
          if(err)
            return res.send(err);
          else
            return res.send({inventory:data});
        }); 
    });

};