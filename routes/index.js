
/*
 * GET home page.
 */
 var express = require('express');
 var router = express.Router();

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.index = function(req, res){
  res.render('new', { title: 'Express' });

};
