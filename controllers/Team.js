var mongoose = require('mongoose');
var Team = require('../models/Team_model');
var auth = require('../utils/authenticator');

module.exports.controller = function(app) {
    
    
    app.post('/getTeams',auth.authAccount,function(req,res){
        var query = Team.findOne({User:req.body.PlayerId});
        query.exec(function(err,data){
            
            if(err)
                return res.send(err);
            else
                return res.send({teams:data});
        }); 
    });
    
    app.post('/editTeams',auth.authAccount,function(req,res){
        var query = Team.findOne({User: req.body.PlayerId});
        query.exec(function(err,teams){
            if(err){
                return res.send({msg:"error",error:err.code});
            }else{
                teams.Teams = JSON.parse(req.body.ModTeams);
                teams.save(function(err,data){
                   if(err){
                       return res.send({msg:"error editing teams",error:err.code});
                   }else{
                       return res.send({msg:"editado exitosamente",teams:data});
                   }
                });
            }
        });
    });

};