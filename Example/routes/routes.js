
/*
 * GET home page.
 */
var ruleController = require('../controller/ruleController');
var storyController = require('../controller/storyController');
var xmlController = require('../controller/xmlController');
var js2jsController = require('../controller/js2jsController');
var mergeController = require('../controller/mergeController');

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
  js2jsController.xml(req, res);
};

exports.js2js = function(req, res){
  js2jsController.js2js(req, res);
};

exports.merge = function(req, res){
  mergeController.merge(req, res);
};

