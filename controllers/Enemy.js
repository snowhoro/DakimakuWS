var mongoose = require('mongoose');
var Enemy = require('../models/Enemy_model');
var auth = require('../utils/authenticator');

module.exports.controller = function(app) {
    
    app.get('/enemy_creator',function(req,res){
      return res.render('enemy_creator');
    });
    
    app.post('/enemy_creator',function(req,res) {
          // any logic goes here
        var enemy = new Enemy({  
          Name: req.body.Name,
          HP: req.body.HP,
          MagicAttack: req.body.MagicAttack,
          MagicDefense: req.body.MagicDefense,
          PhysicalAttack: req.body.PhysicalAttack,
          PhysicalDefense: req.body.PhysicalDefense,
          Attribute: req.body.Attribute,
          Sprite: req.body.Sprite,
          Portrait: req.body.Portrait,
          Turns: req.body.Turns,
          Skills: req.body.Skills
        });
    	  enemy.save(function (err) {
            if (err){
                res.send({msg:'', reason:err.code});
            }else{
              res.send({msg:'creado correctamente', enem_id: enemy});
            }
        });
          
      });
      
    app.post('/getEnemies', function(req,res){
       Enemy.find(function(err,data){
          if(err)
            return res.send(err);
          else
            return res.send({enemies:data});
        }); 
    });

};