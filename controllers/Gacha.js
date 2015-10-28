var mongoose = require('mongoose');
var Inventory = require('../models/Gacha_model');
var auth = require('../utils/authenticator');

module.exports.controller = function(app) {
    
    app.post('/gacha_creator',function(req,res){
        return res.render('gacha_creator');    
    });
    
    app.post('/roll',auth.authAccount,function(req,res){
        var query = Gacha.find({ _id : req.body.GachaId });
        query.exec(function(err,gacha){
            if(err)
                return res.send(err);
            else{
                rndChance =  Math.floor((Math.random() * 2) + 1);
                if(rndChance == 2){
                    rndMonster = Math.floor((Math.random() * gacha.Featured.length));
                    return res.send({ monster: gacha.Featured[rndMonster] });
                }else{
                    rndMonster = Math.floor((Math.random() * gacha.LineUp.length));
                    return res.send({ monster: gacha.LineUp[rndMonster] });
                }
            }
        });
    });
    
    //cuando carga el inventario pide los gachas y guarda sus ids
    app.post('/getGachas',auth.authAccount,function(req,res){
       var query =  Gacha.find();
       query.where('Active').equals(true);
       query.exec(function(err,data){
            if(err)
                return res.send(err);
            else
                return res.send(data);
       });
    });
    
    app.post('/createGacha',auth.authAccount,function(req,res){
        var query = new Gacha({ Featured:req.body.FeaturedChars });   
        query.save(function(err,data){
            if(err)
                res.send(err);
            else
                res.send({gacha:data})
        });
    });


};