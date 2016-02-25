var jsonFile = require('jsonfile')
var util = require('util');
var o2x = require('object-to-xml');

function IsJson(object) {
    if (typeof(object)=="object"){
        return true;
    }
    return false;
}

  /**
   return json for array
  */
function jsonArrayGenerate(name, mapping, config){
    var jsonAdBehavior = '"' + name + '" : [';
    for(var index = 0; index < config.length; index ++){
        if(index > 0){
            jsonAdBehavior += ',';
        }
        jsonAdBehavior += jsonGenerate(null, mapping, config[index]);
    }
    jsonAdBehavior += "]";
    return jsonAdBehavior;
}

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"']/g, function (s) {
      return entityMap[s];
    });
}



function jsonArrayGen(name, mapping, config){
    var json = '"' + name + '" : [';
    for(var index = 0; index < config.length; index ++){
        if(index > 0){
            json += ',';
        }
        json += jsonGen(null, mapping, config[index]);
    }
    json += "]";
    return json;
}

function jsonGen(name, mapping, config){
    var key = '';
    var value = '';
    var sbProperties = '"@" : {'; // start of a properties
    var sbNode = '"#" : {'; //start of object
    var cf = ''; // Child config
    var strJsonChildren = '';
    var json = '';
    var flagProperties = false;
    var flagNode = false;
    for (var attributeName in config) {
        strJsonChildren = '';
        key = attributeName;
        value = config[key];
        if (typeof(value) == "object"){
            cf = value;
            if (flagNode)
                sbNode += (',');
            if (mapping) {
                if (Array.isArray(value)) {
                    strJsonChildren += jsonArrayGen(key, mapping, cf);
                } else {
                   if (isContainObject(mapping, key)) {
                      strJsonChildren += jsonGen(key, mapping, cf);
                    }
                }
            }

            sbNode += strJsonChildren;
            flagNode = true;
        } else {
            if (isContainProperty(mapping, key)) {
                if (flagProperties)
                        sbProperties += (','); // add after end of property
               sbProperties += ('"' + key + '" : "' + escapeHtml(value) + '"');// add into property string
               flagProperties = true;
            }
        }
    }

    if (name) { // check if json node is a object, is not an array
            json += '"' + name  + '" : {' +  sbProperties + "}";
    } else {
        if (sbProperties.length > '"@" : {'.length) {
            json += '{' +  sbProperties + "}";
        }
    }
    if (sbNode.length > '"#" : {'.length) {
        if (sbProperties.length > '"@" : {'.length) {
            json += ', ' + sbNode + "}";
        } else {
            json += '{ ' + sbNode + "}";
        }
    }
    json += "}";
    return json;
}


exports.xmlGen = function(request, response){
    var file = './json/multi-level-section-config.json';
    var mappingFile = './json/mapping.json';


    var appConfig = '', mapping = '';
    jsonFile.readFile(file, function(err, obj) {
        appConfig = obj;
        jsonFile.readFile(mappingFile, function(err, obj) {
            mapping = obj;
            var strJsonClient = '{' +  jsonGen('client', mapping.client, appConfig.client) + '}';

            //console.log("strJsonClient>>>>>>>" + strJsonClient);
            console.log(o2x(JSON.parse(strJsonClient)));
            response.json(JSON.parse(strJsonClient));
        });
    });
}

//Khanh code
exports.checkproperties = function(request, response) {
  var mappingFile = './json/mapping.json';
    jsonFile.readFile(mappingFile, function(err, obj) {
        var mapping = obj;
        console.log("isContainProperty>>> " + isContainProperty(mapping.client, "font-1"));
        response.json({title: "Hello"});
    });
}

//Khanh code
exports.checkObjectData = function(request, response) {
  var mappingFile = './json/mapping.json';
    jsonFile.readFile(mappingFile, function(err, obj) {
        var mapping = obj;
        console.log("isContainObject>>> " + isContainObject(mapping.client, "pushBehavior"));
        response.json({title: "Hello"});
    });
}


function isContainProperty(mappingClient, propName) {
  var isContain = false;
  var properties = [];

  //get all properties
  properties =  getAllProperties(mappingClient);

  // check if an property existing in properties list
  for (var index = 0; index < properties.length; index ++  ) {
    if (properties[index] === propName) {
      isContain = true;
      break;
    }
  }

  return isContain;
}

  function getAllProperties(mappingClient) {
      var properties = [];

      for (var attr in mappingClient) {
        if (attr === "properties") {
          for(var i = 0; i < mappingClient[attr].length; i ++) {
           properties.push(mappingClient[attr][i]);
          }
        } else if ((attr !== "properties") && (attr !== "children")) {
          properties.push.apply(properties, getAllProperties(mappingClient[attr]));
        }
      }
    return properties;
  }

  function isContainObject(mappingClient, objName) {
    var isContain = false;
    var objNames = [];

    //get all object names
    objNames = getAllObjectNames(mappingClient);

    for (var index = 0; index < objNames.length; index ++  ) {
      if(objNames[index] === objName) {
        isContain = true;
        break;
      }
    }
    return isContain;
  }

  function getAllObjectNames(mappingClient) {
    var ojbNames = [];

    for (var attr in mappingClient) {
      if (attr === "children") {
        for (var i = 0; i < mappingClient[attr].length; i ++) {
         ojbNames.push(mappingClient[attr][i]);
        }
      } else if ((attr !== "properties") && (attr !== "children")) {
        ojbNames.push.apply(ojbNames, getAllObjectNames(mappingClient[attr]));
      }
    }
    return ojbNames;
  }
