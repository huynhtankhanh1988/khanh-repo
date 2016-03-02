var StringBuilder = require('./string-builder');
var o2x = require('./object-to-xml');
var Json2XmlManifest = function(){
}

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

Json2XmlManifest.prototype.generateXmlManifest = function(name, config){
    var preJson = "{" + jsonGen(name, config) + "}";
    return o2x(JSON.parse(preJson));
}

function jsonGen(name, config){
    var json = new StringBuilder();
    var key = '';
    var value = '';
    var sbProperties = new StringBuilder();
        sbProperties.append('"@" : {'); // start of a properties
    var sbNode = new StringBuilder();
        sbNode.append('"#" : {'); //start of object
    var cf = ''; // Child config
    var strJsonChildren = '';
    var flagProperties = false;
    var flagNode = false;
    for (var attributeName in config) {
        strJsonChildren = '';
        key = attributeName;
        value = config[key];
        if (typeof(value) == "object"){
            cf = value;
            if (flagNode)
                sbNode.append(',');
            if (Array.isArray(value)) {
                strJsonChildren += jsonArrayGen(key, cf);
            } else {
              strJsonChildren += jsonGen(key, cf);
            }
            sbNode.append(strJsonChildren);
            flagNode = true;
        } else {
            if (flagProperties)
                    sbProperties.append(','); // add after end of property
           sbProperties.append('"' + key + '" : "' + escapeHtml(value) + '"');// add into property string
           flagProperties = true;
        }
    }
    if (name) { // check if json node is a object, is not an array
      if( sbProperties.toString().length > '"@" : {'.length){
                  json.append('"' + name  + '" : {' +  sbProperties.toString() + "}");
      }else{
          json.append('"' + name  + '" : ');
      }
    } else {
        if (sbProperties.toString().length > '"@" : {'.length) {
            json.append('{' +  sbProperties.toString() + "}");
        }
    }
    if (sbNode.toString().length > '"#" : {}'.length) {
        if (sbProperties.toString().length > '"@" : {'.length) {
            json.append(', ' + sbNode.toString() + "}");
        } else {
            json.append('{ ' + sbNode.toString() + "}");
        }
    }
    json.append("}");
    return json.toString();
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

module.exports = Json2XmlManifest;