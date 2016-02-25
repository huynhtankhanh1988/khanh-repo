
/*
 * GET home page.
 */
 var companyController = require('../controller/CompanyController');

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};


exports.company = function(req, res, next){
   companyController.index(req, res);
};

exports.create = function(req, res, next){
   companyController.create(req, res);
};


exports.createRule = function(req, res, next){
   companyController.createRule(req, res);
};

exports.getRule = function(req, res, next){
   companyController.getRule(req, res);
};


exports.updateRule = function(req, res, next){
   companyController.updateRule(req, res);
};



exports.copy = function(req, res, next){
   companyController.copy(req, res);
};



exports.delete = function(req, res, next){
   companyController.delete(req, res);
};
