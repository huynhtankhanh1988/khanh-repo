var express = require('express');
var app = module.exports = express();
var fs = require("fs");
var jstoxml = require('jstoxml');
var jsonfile = require('jsonfile');
var DataTransform = require("node-json-transform").DataTransform

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var file = 'manifest.json';

var data = {
    "brand-header-image-url": "brandImage.png",
    "default-item-photo-url": "WRCBplaceholderGraphic.jpg",
    "item-photo-placement": "left",
    "weather": {
      "link": "true",
      "hide-hilo": "false"
    }
}


var map = {
      "brandheaderimageurl" : 'brand-header-image-url',
      "defaultitemphotourl" : 'default-item-photo-url',
      "itemphotoplacement" : 'item-photo-placement',
      "weather" : 'weather'
}


// var data = {
// 	posts : [
// 		{
// 			title : "title1",
// 			description: "description1",
// 			blog: "This is a blog.",
// 			date: "11/4/2013",
// 			extra : {
// 				link : "http://goo.cm"
// 			},
// 			list1:[
// 				{
// 					name:"mike"
// 				}
// 			],
// 			list2:[
// 				{
// 					item: "thing"
// 				}
// 			],
// 			clearMe: "text"
// 		}
// 	]
// };
//
// var map = {
// 	list : 'posts',
// 	item: {
// 		name: "title",
// 		info: "description",
// 		text: "blog",
// 		date: "date",
// 		link: "extra.link",
// 		item: "list1.0.name",
// 		clearMe: "",
// 		fieldGroup: ['title', 'extra']
// 	},
// 	operate: [
// 		{
// 			run: "Date.parse", on: "date",
// 			run: function(val) { return val + " more info"}, on: "info"
// 		}
// 	]
// };


var dataTransform = DataTransform(data, map);
var result = dataTransform.transform();
console.log(JSON.stringify(result));

app.listen(3000, function(){
  console.log("Express server listening on port 3000");
});
