var mongoose = require('mongoose')
var Inventory = require('../models/Inventory_model');
var Character = require('../models/Character_model');
var Team = require('../models/Team_model');
var auth = require('../utils/authenticator');

module.exports.controller = function(app) {

/**
 * a home page route
 */
      app.post('/createInventory',auth.authAccount,function(req, res) {
          // any logic goes here
        var inv = new Inventory({ User: req.body.PlayerId });
    	    inv.save(function (err) {
                if (err){
                  if (err.code == 11000){
                    res.send({msg:'el usuario ya tiene un inventario', reason:err.code});
                  }else{
                    res.send({msg:'ha ocurrido un error intente de nuevo mas tarde', reason:err.message});
                  }
                  
                }else{
                    var team = new Team({ User: req.body.PlayerId });
                    team.Teams.team_1.push(req.body.StarterId);
                    team.Teams.team_2.push(req.body.StarterId);
                    team.Teams.team_3.push(req.body.StarterId);
                    team.Teams.team_4.push(req.body.StarterId);
                    team.Teams.team_5.push(req.body.StarterId);
                    
                    team.save(function(err,data){
                        if(err){
                            res.send({ msg: 'error al setear los teams', reason:err.code});
                        }else{
                            res.send({msg: 'creado y seteado correctamente', teams: data});
                        }
                    });
                }
            });
      });
  

    app.post('/getInventory',auth.authAccount,function(req,res){
        var query = Inventory.findOne({User:req.body.PlayerId});
        query.populate('Characters.PlayerChar.MaxChar');
       // query.populate('User','PlayerName');
        query.exec(function(err,data){
            
            if(err)
                return res.send(err);
            else
                return res.send({inventory:data});
        });
    
    });
    
 
     app.post('/addCharacter',auth.authAccount,function(req, res) {
        Inventory.findOne({ User: req.body.PlayerId },function(err,inventory){
            if(err)
                return res.send(err.message);
            else{
                inventory.Characters.push({MaxChar: req.body.CharacterId});
                inventory.save(function(err,done){
                    if(err)
                        return res.send(err.message);
                    else
                        return res.send(done);
                });
            }
        });
    });

    app.post('/removeCharacter',auth.authAccount,function(req, res) {
         Inventory.findOne({ User: req.body.PlayerId },function(err,inventory){
            if(err)
                return res.send(err.message);
            else{
                inventory.Characters.pull(req.body.CharacterId);
                inventory.save(function(err,done){
                    if(err)
                        return res.send(err.message);
                    else
                        return res.send(done);
                });
            }
        });
    });
     
    app.post('/characterFusion',auth.authAccount,function(req,res){

      var query = Inventory.findOne({User:req.body.PlayerId});
      query.exec(function(err,inventory){
          if(err){
              return res.send(err);
          }else{
              var fusedChar = JSON.parse(req.body.Character);
              var fodderIds = JSON.parse(req.body.FodderIds);
                
                for(var i = 0; i < inventory.Characters.length; i++){
                    if(inventory.Characters[i]._id == fusedChar._id){

                        fusedChar._id = mongoose.Types.ObjectId(fusedChar._id);
                        fusedChar.PlayerChar.MaxChar = mongoose.Types.ObjectId(fusedChar.PlayerChar.MaxChar);
                        inventory.Characters[i].PlayerChar = fusedChar.PlayerChar;
                    }
                    for(var f = 0;f < fodderIds.length; f++){
                        if(inventory.Characters[i]._id == fodderIds[f]){
                            console.log('hola');
                            inventory.Characters.splice(i,1);
                        }
                    }
                }
                
                inventory.save(function(err,result){
                    if(err){
                        return res.send(err);
                    }else{
                        return res.send(result);
                    }
                });
          }
      })
    });
    
    app.post('/character_evolution',auth.authAccount,function(req,res){
        
    });


};