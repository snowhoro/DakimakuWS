var mongoose = require('mongoose')
var Inventory = require('../models/Inventory_model');
var Character = require('../models/Character_model');
var auth = require('../utils/authenticator');

module.exports.controller = function(app) {

/**
 * a home page route
 */
      app.get('/createInventory',auth.authAccount,function(req, res) {
          // any logic goes here
        var inv = new Inventory({ InventoryID: req.query.PlayerId });
    	  inv.save(function (err) {
            if (err){
              if (err.code == 11000){
                res.send({msg:'el usuario ya tiene un inventario', reason:err.code});
              }else{
                res.send({msg:'ha ocurrido un error intente de nuevo mas tarde', reason:err.code});
              }
              
            }else{
              res.send({msg:'creado correctamente',user_id: inv.InventoryID});
            }
          });
          
      });
  
  
    app.get('/getInventory',auth.authAccount,function(req,res){
        Inventory.findOne({ InventoryID: req.query.PlayerId })
                 .populate('Characters.MaxChar','Name')
                 .populate('InventoryID','PlayerName')
                 .exec(function(err,data){
          if(err)
            return res.send(err);
          else
            return res.send({inventory:data});
        });
    });
    
 
     app.get('/addCharacter',auth.authAccount,function(req, res) {
        Inventory.findOne({ InventoryID: req.query.PlayerId },function(err,inventory){
            if(err)
                return res.send(err.message);
            else{
                inventory.Characters.push({MaxChar: req.query.CharacterId});
                inventory.save(function(err,done){
                    if(err)
                        return res.send(err.message);
                    else
                        return res.send(done);
                });
            }
        });
    });

    app.get('/removeCharacter',auth.authAccount,function(req, res) {
         Inventory.findOne({ InventoryID: req.query.PlayerId },function(err,inventory){
            if(err)
                return res.send(err.message);
            else{
                inventory.Characters.pull(req.query.CharacterId);
                inventory.save(function(err,done){
                    if(err)
                        return res.send(err.message);
                    else
                        return res.send(done);
                });
            }
        });
    });
     
 


};