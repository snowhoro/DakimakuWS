var mongoose = require('mongoose');
var Inventory = require('../models/Session_model');
var auth = require('../utils/authenticator');

module.exports.controller = function(app) {
    
    
    app.post('/createSession',auth.authAccount,function(req,res){
        var query = new Session({ User:req.body.PlayerId });   
        query.save(function(err,data){
            if(err)
                res.send(err);
            else
                res.send({session:data})
        });
    });
    
    
    app.post('/updateSession',auth.authAccount,function(req,res){
        var query = Session.findOne({ User:req.body.PlayerId });
        query.LastLog = Date.now();
        query.exec(function(err,session){
            
            if(err)
                res.send(err);
            else{
                session.update({
                    LastLog: Date.now(),
                    StaminaTimer: new Date(req.body.StaminaTimer),
                    CurrentStamina: req.body.CurrentStamina
                }).exec(function(err,result){
                    if(err)
                        res.send(err);
                    else
                        res.send(result);
                });
            }
                
    
        });
    });


};