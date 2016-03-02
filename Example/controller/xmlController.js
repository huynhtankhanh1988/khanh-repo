var jsonFile = require('fs')
var util = require('util');
var o2x = require('../entity/object-to-xml');
var StringBuilder = require('../entity/string-builder');
var properties; // Child properties


function IsJson(object) {
    if (typeof(object)=="object"){
        return true;
    }
    return false;
}

function isProperties(properties, str){
    if(!properties){
        return false;
    }
    for(var index = 0; index < properties.length; index++){
        if(properties[index] === str){
            return true;
        }
    }
    return false;
}


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
    var json = new StringBuilder();
    var key = '';
    var value = '';
    var sbProperties = '"@" : {';
    var sbNode = '"#" : {';
    var mp = ''; // Child mapping
    var cf = ''; // Child config
    var strJsonChildren = '';
    var flagProperties = false;
    var flagNode = false;

    for(var attributeName in config){
        strJsonChildren = '';
        key = attributeName;
        value = config[key];
        if (typeof(value)=="object"){
            cf = value;
            if(flagNode)
                sbNode += (',');
            if(mapping){
                if(Array.isArray(value)){
                    strJsonChildren += jsonArrayGen(key, mapping, cf);
                }else{
                    strJsonChildren += jsonGen(key, mapping, cf);
                }
            }

            sbNode += strJsonChildren;
            flagNode = true;
            properties = mapping[attributeName];
            if(properties){
                properties = properties["properties"];
            }
        }else{
            //if(isProperties(properties, key)){
                if(flagProperties)
                        sbProperties += (',');
               sbProperties += ('"' + key + '" : "' + escapeHtml(value) + '"');
               flagProperties = true;
           // }
        }
    }

    if(name){
        if( sbProperties.length > '"@" : {'.length){
                    json.append('"' + name  + '" : {' +  sbProperties + "}");
        }else{
            json.append('"' + name  + '" : ');
        }

    }else{
        if( sbProperties.length > '"@" : {'.length){
            json.append('{' +  sbProperties + "}");
        }
    }
    if(sbNode.length > '"#" : {}'.length){
        if( sbProperties.length > '"@" : {'.length)
        {
            json.append(', ' + sbNode + "}");
        }else{
            json.append('{' + sbNode + "}");
        }
    }
    json.append("}");
    return json;
}


function jsonGenerate(name, mapping, config){
    var properties = mapping.properties;
    var map = mapping.mapping;
    var sbProperties = '"@" : {';
    var sbNode = '';
    var key, value;
    var configValue = '';
    var flagProperties = false;
    var flagNode = false;
    for(var attributeName in map){
        key = '';
        value = '';
        key = attributeName;
        value = map[key];
        try {
           configValue = config[value];
        }
        catch (e) {
            configValue = null;
        }
        if(configValue){
            if(isProperties(properties, value)){
                if(flagProperties)
                    sbProperties += (',');
                sbProperties += ('"' + key + '" : "' + escapeHtml(configValue) + '"');
                flagProperties = true;
            }else{
                if(name === 'client'){
                }
                if(flagNode)
                    sbNode += (',');
                if (typeof(configValue)=="object"){
                    var strJsonChildren = '';
                    var con = configValue;
                    var mp = mapping[key];

                    if(Array.isArray(con)){
                        strJsonChildren += jsonArrayGenerate(key, mp, con);
                    }else{
                        strJsonChildren += jsonGenerate(key, mp, con);
                    }
                    sbNode += strJsonChildren;
                }else{
                    sbNode += ('"' + key + '" : "' + escapeHtml(configValue) + '"');
                }
                flagNode = true;
            }
        }
    }
    sbProperties += ('}');
    var sb = '';
    if(name){
        sb += '"' + name  + '" : {' +  sbProperties;
    }else{
        sb += '{' +  sbProperties;
    }
    if(sbNode.length > 2){
        sb += ', "#" : {' + sbNode;
    }else{
        sb += '}';
    }
    return sb;
}

exports.xmlGen = function(request, response){
    //var file = './json-file/app-config.json';
    var file = './json/multi-level-section-config.json';
    //var mappingFile = './json-file/app-config-mapping.json';
    var mappingFile = './json/mapping.json';


    var appConfig = '', mapping = '';
    jsonFile.readFile(file, function(err, obj) {
        appConfig = JSON.parse(obj);
        jsonFile.readFile(mappingFile, function(err, obj) {
            mapping = JSON.parse(obj);
            var strJsonClient = '{' +  jsonGen('client', mapping.client, appConfig.client) + '}';
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log(strJsonClient);
            var xml = o2x(JSON.parse(strJsonClient));
            jsonFile.writeFile('manifest.xml', xml,  function(err) {
               if (err) {
                    response.end(err);
               }
            });
            response.end(xml);
        });
    });

}
