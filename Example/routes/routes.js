
/*
 * GET home page.
 */
var ruleController = require('../controller/ruleController');
var storyController = require('../controller/storyController');
var xmlController = require('../controller/xmlController');
var js2jsController = require('../controller/js2jsController');
var prejson = require('../controller/prejson');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

/*
* Rule
*/
exports.getRule = function(req, res){
    ruleController.getRule(req, res);
};

exports.createRule = function(req, res){
    ruleController.createRule(req, res);
};

exports.updateRule = function(req, res){
    ruleController.updateRule(req, res);
};

exports.deleteRule = function(req, res){
     ruleController.deleteRule(req, res);
};

exports.storySearch = function(req, res){
     storyController.searchStories(req, res);
};

exports.xmlGen = function(req, res){
  xmlController.xmlGen(req, res);
};

exports.js2js = function(req, res){
  js2jsController.js2js(req, res);
};

exports.checkproperties = function(req, res){
  xmlController.checkproperties(req, res);
};

exports.checkObjectData = function(req, res){
  xmlController.checkObjectData(req, res);
};

exports.prejson = function(req, res){
  prejson.prejson(req, res);
  //res.end("hello");
};
