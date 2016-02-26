'use strict';

var mongoose = require('mongoose'),
  Receita = require('../models/receita.model');
  
exports.findAll = function(req, res){
  Receita.find({}).exec(function(err, receitas){
    if(err){
      console.error(err);
      res.status(400).json(err);
    }
    else {
      res.json(receitas);
    }
  })
};


exports.find = function(req, res){
  res.json(req.receita);
};

exports.create = function(req, res){
  var receita = new Receita(req.body);
  receita.brewery_id = req.brewery._id;
  receita.created_at = new Date();
  receita.save(function(err){
    if(err){
      res.status(400).json({message: err});
    }
    else {
      res.json({
        message: 'Receita criada com sucesso',
        receita: receita
      });
    }
  });
};

exports.update = function(req, res){
  var receita = req.receita;
  receita.name = req.body.name;
  receita.recipe = req.body.recipe;
  receita.brewery_id = req.brewery._id;
  receita.updated_at = new Date();
  
  receita.save(function(err){
    if(err){
      res.status(400).json({
        message: err
      });
    }
    else {
      res.json({
        message: 'Receita alterada com sucesso',
        receita: receita
      });
    }
  });
};

exports.delete = function(req, res){
  var receita = req.receita;
  receita.remove(function(err){
    if(err){
      res.status(400).json({
        message: err
      });
    }
    else {
      res.json({
        message: 'Receita removida com sucesso',
        receita: receita
      });
    }
  });
};

exports.receitaById = function(req, res, next, receitaId){
  if(!mongoose.Types.ObjectId.isValid(receitaId)){
    res.status(400).json({
      message: 'Receita inválida'
    });
  }
  Receita.findById(receitaId).exec(function(err, receita){
    if(err){
      res.status(400).json(err);
    }
    req.receita = receita;
    next();
  });
}

exports.receitasByBreweryId = function(req, res, next, breweryId){
  //console.log("receita" + breweryId);
  if(!mongoose.Types.ObjectId.isValid(breweryId)){
    res.status(400).json({
      message: 'Cervejaria inválida'
    });
  }
  var BreweryObjectId = new mongoose.Types.ObjectId(breweryId);
  //console.log(BreweryObjectId);
  Receita.find({brewery_id: BreweryObjectId}).exec(function(err, receita){
    if(err){
      res.status(400).json(err);
    }
    else {
      //console.log(JSON.stringify(receita, null, 2));
      res.json(receita);
    }
  })
}