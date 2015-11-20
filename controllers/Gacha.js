var mongoose = require('mongoose');
var Inventory = require('../models/Inventory_model');
var Gacha = require('../models/Gacha_model');
var Account = require('../models/Account_model');
var auth = require('../utils/authenticator');


module.exports.controller = function(app) {
    
    app.get('/gacha_creator',function(req,res){
        Character.find(function(err,data){
          if(err)
            return res.send(err);
          else{
            return res.render('gacha_creator',{ characters:data });
          }
        });
    });
    
    app.post('/gacha_creator',function(req,res){
        var query = new Gacha({ 
            GachaName: req.body.GachaName,
            Featured:req.body.featuredChars,
            LineUp:req.body.lineupChars 
        });   
        query.save(function(err,data){
            if(err)
                res.send(err);
            else
                res.send({gacha:data})
        });
    });
    
    app.get('/gacha_list',function(req,res){
        Gacha.find(function(err,data){
          if(err)
            return res.send(err);
          else{
            return res.render('gacha_list',{ gachas : data });    
          }
        });
        
    });
    
    
    app.post('/roll',auth.authAccount,function(req,res){
        var monster;
        var query = Gacha.find({ _id : req.body.GachaId });
        query.exec(function(err,gacha){
            if(err)
                return res.send(err);
            else{
                rndChance =  Math.floor((Math.random() * 2) + 1);
                if(rndChance == 2){
                    rndMonster = Math.floor((Math.random() * gacha[0].toObject().Featured.length));
                    monster = gacha[0].toObject().Featured[rndMonster];
                }else{
                    rndMonster = Math.floor((Math.random() * gacha[0].toObject().LineUp.length));
                    monster = gacha[0].toObject().LineUp[rndMonster];
                }
                Inventory.findOne({ User: req.body.PlayerId },function(err,inventory){
                    if(err)
                        return res.send(err.message);
                    else{
                        inventory.Characters.push({"PlayerChar.MaxChar": monster});
                        inventory.save(function(err,done){
                            if(err)
                                return res.send(err.message);
                            else
                                return res.send(done);
                        });
                    }
                });
            }
        });
    });
    
    //cuando carga el inventario pide los gachas y guarda sus ids
    app.post('/getGachas',auth.authAccount,function(req,res){
       var query =  Gacha.find();
       query.where('Active').equals(true);
       query.populate({
           path: 'Featured LineUp',
           select: 'Name Sprite'
       });
       query.exec(function(err,data){
            if(err)
                return res.send(err);
            else
                return res.send(data);
       });
    });
    
    app.post('/gacha_status',function(req,res){
        //var status = JSON.parse(req.body.Status);
        var query = Gacha.find({ _id : req.body.GachaId });
        query.update({$set: {Active: !query.Active }},function(err,count){
            if(err)
                return res.send(err);
            else
                return res.send(count);
       });
    });
    
    app.post('/gacha_delete',function(req,res){
        //var status = JSON.parse(req.body.Status);
        var query = Gacha.find({ _id : req.body.GachaId });
        query.remove(function(err,count){
            if(err)
                return res.send(err);
            else
                return res.send(count);
       });
    });

};