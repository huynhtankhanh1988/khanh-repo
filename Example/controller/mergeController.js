var jsonFile = require('jsonfile')
var util = require('util');
var StringBuilder = require('../entity/string-builder');
var MergeRecursive = require('../entity/merge-recursive');

exports.merge = function(request, response){
  var franklySetting = './json/setting.json';
  var affiliateSetting = './json/affiliate-setting.json';
  var mergeRecursive = new MergeRecursive();
  var finalSetting = '';
  jsonFile.readFile(franklySetting, function(err, obj) {
    if(obj){
        franklySetting = obj;
        jsonFile.readFile(affiliateSetting, function(err, obj) {
           if(obj){
              affiliateSetting = obj;
              finalSetting = mergeRecursive.merge(franklySetting, affiliateSetting);
              response.end(JSON.stringify(finalSetting));
           }
        });
    }
  });

}