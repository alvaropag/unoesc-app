'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    favicon = require('serve-favicon'),
    allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', "http://localhost:8080");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    };

module.exports = function(db) {
    var app = express();
    app.use(allowCrossDomain);
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    
    var api = express.Router();
    require('../app/core/routes/core.routes')(api);
    require('../app/breweries/routes/breweries.routes')(api);
    require('../app/receitas/routes/receitas.routes')(api);
    
    app.use('/api', api);
    
    return app;
}