var jsonFile = require('jsonfile')
var util = require('util');
var StringBuilder = require('../entity/string-builder');
var Json2JsonManifest = require('../entity/json-to-json-manifest');
var Json2XmlManifest = require('../entity/json-to-xml-manifest');
var categoryFeed ='';
var slideShowFeed ='';
var fs = require('fs')

var headerFont ='';
var alt = ";alt=json";

var Js2js = require('../entity/json-to-json-manifest');

//
//
//function clientJson(menu, theme, setting, mapping){
//   var json = new StringBuilder();
//   json.append('{ "client" : {');
//   json.append('"partner-id" :  "' + menu.affiliateId + '",');
//   json.append('"partner-name" :  "' + setting.config.general.brandName + '",');
//   json.append('"xsi:schemaLocation" : "http://www.mobdub.com/newsmanifest                               http://www.mobdub.com/public/schema/newsmanifest.xsd" ,');
//   json.append('"xmlns" : "http://www.mobdub.com/newsmanifest" ,');
//   json.append('"xmlns:xsi" : "http://www.w3.org/2001/XMLSchema-instance" ,');
//   json.append('"xmlns:xs" : "http://www.w3.org/2001/XMLSchema" ,');
//   json.append('"xmlns:ns" : "http://www.mobdub.com/newsmanifest" ,');
//   json.append('"xmlns:hfp" : "http://www.w3.org/2001/XMLSchema-hasFacetAndProperty", ');
//   json.append(jsonPushBehavior(setting.config.pushBehavior, mapping.setting.pushBehavior));
//   json.append(",");
//   json.append(jsonReportingBehavior(setting.config.reportingBehavior, mapping.setting.reportingBehavior));
//   json.append(",");
//   json.append(jsonAdBehavior(setting.config.adBehavior, mapping.setting.adBehavior));
//   json.append(",");
//   json.append(jsonBrandCustomization(theme.config, mapping.theme));
//   json.append(",");
//   json.append(jsonSettings(setting.config.settings, mapping.setting.settings));
//   json.append(",");
//   json.append(jsonTrafficMap(setting.config.trafficMap, mapping.setting.trafficMap));
//   json.append(",");
//   categoryFeed =  json4PremiumFeed(setting.config.premiumFeeds.category, mapping.setting.premiumFeeds.category);
//   slideShowFeed =  json4PremiumFeed(setting.config.premiumFeeds.slideShow, mapping.setting.premiumFeeds.slideShow);
//   json.append(jsonSection(menu.config, theme.config, setting.config, mapping))
//   json.append("}");
//   json.append("}");
//   return json.toString();
//
//}
//
//function jsonSection(menu, theme, setting, mapping){
//    var headerFont = theme.headerFontColor;
//    var json = new StringBuilder();
//    json.append('"section" : [');
//    // breakingNews
//    json.append(jsonBreakingNews(setting.breakingNews, mapping.setting.breakingNews));
//    json.append(",");
//    json.append(jsonMenu(headerFont, menu, setting, mapping));
//    json.append("]")
//    return json.toString();
//}
//
//function jsonMenu(headerFont, menu, setting, mapping){
//    var json = new StringBuilder();
//    for(var index = 0; index < menu.length; index ++){
//        if(index > 0){
//            json.append(',');
//        }
//        json.append(jsonMenuNode(null, menu[index], mapping.menu));
//    }
//    return json.toString();
//}
//
//function jsonBreakingNews(data, mapping){
//    var json = new StringBuilder();
//    var key ='',
//        value ='',
//        index = 0;
//    json.append("{")
//    var jsonFeed = new StringBuilder();
//    jsonFeed.append('"feed" : [{' )
//    for(var attribute in data){
//        key = mapping[attribute];
//        value = data[attribute];
//        if(attribute == "feedUrl"){
//            jsonFeed.append(jsonData(0, key, value));
//        }else{
//            json.append(jsonData(index, key, value));
//            index ++;
//        }
//    }
//    jsonFeed.append("}]");
//    json.append(",");
//    json.append(jsonFeed);
//    json.append("}");
//    return json.toString();
//}
//
//function jsonData(index, key, value){
//    var json = new StringBuilder();
//    if(index == 0){
//        json.append('"' + key + '" : "' + value + '"');
//    }else{
//        json.append(',"' + key + '" : "' + value + '"');
//    }
//    return json.toString();
//}
//
//function jsonArrayNodeGenerate(name, data, mapping){
//    var json = new StringBuilder();
//    json.append('"' + name + '" : [');
//    for(var index = 0; index < data.length; index ++){
//        if(index > 0){
//            json.append(',');
//        }
//        json.append(jsonNodeGenerate(null, data[index], mapping));
//    }
//    json.append("]");
//    return json.toString();
//}
//function jsonNodeGenerate(name, data, mapping){
//    var json = new StringBuilder();
//    var key ='',
//        value ='',
//        index = 0;
//    if(name){
//        json.append('"' + name + '" : {');
//    }else{
//        json.append('{');
//    }
//    for(var attribute in data){
//        key = mapping[attribute];
//        value = data[attribute];
//        if(typeof(value)=="object"){
//            if(index > 0){
//                json.append(",")
//            }
//            json.append(jsonNodeGenerate(attribute, value, key));
//            index ++;
//        }else{
//            if(key){
//                json.append(jsonData(index, key, value));
//                index ++;
//            }
//        }
//    }
//    json.append("}");
//    return json.toString();
//}
//
//function jsonAttribute(data, mapping){
//    var json = new StringBuilder();
//    var key ='',
//        value ='',
//        index = 0;
//    for(var attribute in data){
//        key = mapping[attribute];
//        value = data[attribute];
//        json.append(jsonData(index, key, value));
//        index ++;
//    }
//    return json.toString();
//}
//
//function jsonPushBehavior(data, mapping){
//    var json = new StringBuilder();
//    var key ='',
//        value ='',
//        provider = '',
//        dt ='',
//        mp = '',
//        index = 0;
//    var pushService = mapping["pushService"];
//    provider = data.defaultProvider;
//    json.append('"pushBehavior" : { ');
//    if(provider){
//        key = mapping.enabled;
//        value = data.enabled;
//        json.append('"' + key + '" : "' + value + '", ')
//        key = mapping.defaultProvider;
//        json.append('"' + key + '" : "' + provider + '", ');
//        if(provider == 'parse'){
//            dt = data.parse;
//            mp = mapping.parse;
//        }else{
//            dt = data.urbanAirship;
//            mp = mapping.urbanAirship;
//        }
//        if(pushService){
//            json.append(jsonNodeGenerate("pushService", dt, mp));
//        }else{
//            json.append(jsonAttribute(dt, mp));
//        }
//        dt = data.channels;
//        mp = mapping.channels;
//        if(dt){
//            json.append(",");
//            json.append(jsonArrayNodeGenerate("chanel", dt, mp));
//        }
//        json.append("}");
//    }
//    return json.toString();
//}
//
//
//function jsonReportingBehavior (data, mapping) {
//    return jsonNodeGenerate("reportingBehavior", data, mapping);
//}
//
//
//function jsonAdBehavior(data, mapping){
//    return jsonNodeGenerate("adBehavior", data, mapping);
//}
//
//function jsonBrandCustomization(data, mapping){
//    return jsonNodeGenerate("brandCustomization", data, mapping);
//}
//
//
//function jsonSettings(data, mapping){
//    return jsonNodeGenerate("settings", data, mapping);
//}
//
//function jsonTrafficMap(data, mapping){
//    return jsonNodeGenerate("trafficMap", data, mapping);
//}
//
//function json4PremiumFeed(data, mapping){
//    var array =[];
//        array.push(data);
//    return jsonArrayNodeGenerate("feed", array, mapping);
//}
//
//function jsonMenuArray(name, data, mapping){
//    var json = new StringBuilder();
//    json.append('"' + name + '" : [');
//    for(var index = 0; index < data.length; index ++){
//        if(index > 0){
//            json.append(',');
//        }
//        json.append(jsonMenuNode(null, data[index], mapping));
//    }
//    json.append("]");
//    return json.toString();
//}
//function jsonMenuNode(name, data, mapping){
//    var json = new StringBuilder();
//    var key ='',
//        value = '',
//        index = 0,
//        map = '';
//    if(name){
//        json.append('"' + name + '" : {');
//    }else{
//        json.append("{");
//    }
//    var map = '';
//    for(var attributeName in data){
//        value = data[attributeName];
//        key = mapping[attributeName];
//        if (typeof(value)=="object"){
//            if(Array.isArray(value)){
//                map = mapping[attributeName];
//                if(typeof(map)=="object"){
//                    if(index > 0){
//                        json.append(",");
//                    }
//                    json.append(jsonMenuArray(attributeName, value, map));
//                }else{
//                    if(key){
//                        if(index > 0){
//                            json.append(",");
//                        }
//                        json.append(jsonMenuArray(key, value, mapping))
//                    }
//                }
//            }else{
//                map = mapping[attributeName];
//                if(index > 0){
//                    json.append(",");
//                }
//                if(typeof(map)=="object"){
//                    json.append(jsonMenuNode(attributeName, value, map));
//                }else{
//                    json.append(jsonMenuNode(key, value, mapping));
//                }
//            }
//            index ++;
//        }else{
//            if(key){
//                json.append(jsonData(index, key, value));
//                index ++;
//            }
//        }
//    }
//    var menuType = data["menuItemType"];
//    if(menuType == "category"){
//        json.append(",");
//        json.append(categoryFeed);
//    }
//    if(menuType == "slideshow"){
//        json.append(",");
//        json.append(slideShowFeed);
//    }
//    json.append("}");
//    return json.toString();
//}
//
//function menuJson(menu, mapping){
//     var json = new StringBuilder();
//     //json.append('{');
//     json.append(jsonArray("section", menu.config, mapping.menu));
//     //json.append('}');
//     return json.toString();
//}
//
//function themeJson(theme, mapping){
//    var json = new StringBuilder();
//    json.append(jsonNode("brandCustomization", theme.config, mapping.theme));
//    return json.toString();
//}

exports.xml = function(request, response){
    var sb = new StringBuilder();
    var file = './json/menu.json';
    var themeFile = './json/theme.json';
    var mappingFile = './json/json-manifest-mapping.json';
    var settingFile = './json/setting.json';
    var menu = '', mapping = '', theme = '', setting = '';
    jsonFile.readFile(themeFile, function(err, obj) {
        if(obj){
            theme = obj;
            jsonFile.readFile(file, function(err, obj) {
            if(obj){
                menu = obj;
                jsonFile.readFile(mappingFile, function(err, obj) {
                    if(obj){
                        mapping = obj;
                        jsonFile.readFile(settingFile, function(err, obj) {
                            if(obj){
                                setting = obj;

                                var json2JsonManifest = new  Json2JsonManifest();
                                var json2XmlManifest = new Json2XmlManifest();
                                var jsonManifest = json2JsonManifest.generateManifestJson(menu, theme, setting, mapping);
                                jsonManifest = JSON.parse(jsonManifest);
                                var strJson = JSON.stringify(jsonManifest, null, 4);
                                fs.writeFile('manifest.json',strJson,  function(err) {
                                   if (err) {;
                                   }
                                });
                                var xml = json2XmlManifest.generateXmlManifest("client", jsonManifest.client);
                                fs.writeFile('manifest.xml', xml,  function(err) {
                                   if (err) {
                                        //response.end(err);
                                   }
                                });
                                response.end(xml.toString());
                            }
                        })

                    }
                });
            }
        });
        }
    });
}
exports.js2js = function(request, response){
    var sb = new StringBuilder();
    var file = './json/menu.json';
    var themeFile = './json/theme.json';
    var mappingFile = './json/json-manifest-mapping.json';
    var settingFile = './json/setting.json';
    var menu = '', mapping = '', theme = '', setting = '';
    var js2js = new Js2js();
    jsonFile.readFile(themeFile, function(err, obj) {
        if(obj){
            theme = obj;
            jsonFile.readFile(file, function(err, obj) {
            if(obj){
                menu = obj;
                jsonFile.readFile(mappingFile, function(err, obj) {
                    if(obj){
                        mapping = obj;
                        jsonFile.readFile(settingFile, function(err, obj) {
                            if(obj){
                                setting = obj;
                                sb.append(js2js.generateManifestJson(menu, theme, setting, mapping));
                                response.end(sb.toString());
                            }
                        })

                    }
                });
            }
        });
        }
    });

}
