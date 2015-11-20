var mongoose = require('mongoose')
var Character = require('../models/Character_model');
var auth = require('../utils/authenticator');

module.exports.controller = function(app) {
    
    app.get('/character_creator',function(req,res){
      return res.render('character_creator');
    });
    
    app.post('/character_creator',function(req,res) {
          // any logic goes here
        var char = new Character({  
          Name: req.body.Name,
          Rarity: req.body.Rarity,
          MaxHP: req.body.MaxHP,
          MaxMagicAttack: req.body.MaxMagicAttack,
          MaxMagicDefense: req.body.MaxMagicDefense,
          MaxPhysicalAttack: req.body.MaxPhysicalAttack,
          MaxPhysicalDefense: req.body.MaxPhysicalDefense,
          Attribute: req.body.Attribute,
          Sprite: req.body.Sprite,
          Portrait: req.body.Portrait,
          Skills: req.body.Skills
        });
    	  char.save(function (err) {
            if (err){
                res.send({msg:'', reason:err.code});
            }else{
              res.send({msg:'creado correctamente', char_id: char});
            }
          });
          
      });
      
    app.post('/getCharacter',auth.authAccount, function(req,res){
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