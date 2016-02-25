var jsonFile = require('jsonfile')
var util = require('util');
var o2x = require('object-to-xml');
var fs = require('fs');
var js2xmlparser = require("js2xmlparser");
var StringBuilder = require('../entity/string-builder');

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};


exports.prejson = function(request, response) {
  //var file = './json/khanh_menu.json';
  var file = './json/multi-level-section-config.json';
  // var file = './json/menu.json';

  jsonFile.readFile(file, function(err, obj) {
    var appConfig = obj;
    var strJsonClient = '{' +  jsonGen('client', appConfig.client) + '}';
    console.log(strJsonClient);
    //console.log(strJsonClient);
  //  console.log(o2x(JSON.parse(strJsonClient)));
  //  var xml = o2x(JSON.parse(strJsonClient));
  //  xml = xml.replace(/~emptyString~/g, "");
  //  console.log(xml);
    //response.json(JSON.parse(strJsonClient));
  //  response.end(xml);
  })

  response.end("hello");
}

function jsonGen(name, config){// name: this
    var json = new StringBuilder();
    var key = '';
    var value = '';
    var sbProperties = '"@" : {'; // start of a properties
    var sbNode = '"#" : {'; //start of object
    var cf = ''; // Child config
    var strJsonChildren = '';
    var flagProperties = false;
    var flagNode = false;
    for (var attributeName in config) {
        strJsonChildren = '';
        key = attributeName;
        value = config[key];
        if (!value) {
          value = "~emptyString~";
        }

        if (typeof(value) == "object"){
            cf = value;
            if (flagNode)
                sbNode += (',');
            if (Array.isArray(value)) {
                strJsonChildren += jsonArrayGen(key, cf);
            } else {
              strJsonChildren += jsonGen(key, cf);
            }

            sbNode += strJsonChildren;
            flagNode = true;
        } else {
            if (flagProperties)
                    sbProperties += (','); // add after end of property
           sbProperties += ('"' + key + '" : "' + escapeHtml(value) + '"');// add into property string
           flagProperties = true;
        }
    }
    console.log("name>>> " + name + " >>>sbProperties>>> " + sbProperties);

    if (name) { // check if json node is a object, is not an array
      if( sbProperties.length > '"@" : {'.length){
                  json.append('"' + name  + '" : {' +  sbProperties + "}");
      }else{
          json.append('"' + name  + '" : ');
      }
    } else {
        if (sbProperties.length > '"@" : {'.length) {
            json.append('{' +  sbProperties + "}");
        }
    }
    if (sbNode.length > '"#" : {}'.length) {
        if (sbProperties.length > '"@" : {'.length) {
            json.append(', ' + sbNode + "}");
        } else {
            json.append('{ ' + sbNode + "}");
        }
    }
    json.append("}");
    return json;
}

function jsonArrayGen(name, config){
    var json = '"' + name + '" : [';
    for(var index = 0; index < config.length; index ++){
        if(index > 0){
            json += ',';
        }
        json += jsonGen(null, config[index]);
    }
    json += "]";
    return json;
}

function escapeHtml(string) {
    return String(string).replace(/[&<>"']/g, function (s) {
      return entityMap[s];
    });
}
