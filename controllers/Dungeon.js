var mongoose = require('mongoose')
var auth = require('../utils/authenticator');
var Dungeon = require('../models/Dungeon_model');

module.exports.controller = function(app) {
    
    app.get('/dungeon_creator',function(req,res){
       res.render('dungeon_creator'); 
    });
    
    app.post('/dungeon_creator',function(req,res){
       var dungeon = new Dungeon({  
          DungeonName: req.body.DungeonName,
         // StageNumber: req.body.StageNumber,
          BackgroundImg: req.body.BackgroundImg,
          Stages: JSON.parse(req.body.Stages)
        });
    	dungeon.save(function (err) {
            if (err){
                res.send({msg:'', reason:err.code});
            }else{
                res.send({msg:'creado correctamente', dungeon: dungeon});
            }
        }); 
    });
    
    app.post('/getDungeon',function(req,res){
       var query = Dungeon.findOne({_id:req.body.DungeonId});
        query.exec(function(err,data){
            
            if(err)
                return res.send(err);
            else
                return res.send(data);
        }); 
    });
    
    app.post('/getAllDungeons',function(req,res){
       var query = Dungeon.find();
       query.select('_id DungeonName');
        query.exec(function(err,data){
            if(err)
                return res.send(err);
            else
                return res.send(data);
        }); 
    });

};

