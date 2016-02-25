/*
 * Test commit from eclipse
 */

var ruleConfig = require('../configuration/ruleConf');
var globalConfig = require('../configuration/globalConf');
var Client = require('node-rest-client').Client;
var RuleApi = function(){
};

RuleApi.prototype.search = function(body){

};

RuleApi.prototype.getRuleById = function(id, callback){
  var client = new Client();
  var path = {"id": id}
  var url = ruleConfig.ENDPOINT_GET_RULE_BY_ID
  console.log(url);
  console.log(path);
  headers  = {
    'Authorization': globalConfig.AUTHORIZATION_VALUE,
    'Content-Type': globalConfig.CONTENT_TYPE_APP_JSON
  }
  var args ={
      headers: headers,
      path: path
    };
  var responseData = '';
  client.get(url, args, function(data, response){
    responseData += data;
    callback(responseData);
  });
};

module.exports.RuleApi = RuleApi;
