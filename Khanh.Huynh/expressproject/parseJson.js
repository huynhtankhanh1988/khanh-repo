  var express = require('express');
  var app = module.exports = express();
  var fs = require("fs");
  var jstoxml = require('jstoxml');
  var jsonfile = require('jsonfile');

  // Configuration
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');


  var ss = {
    a : 'a',
    b: 'b',
    c: {
      d: 'd',
      e: "e"
    }
  }

  var final = {};
  var pp = {};
  function readJson(obj) {
    var isProperties = false;

    for (var attr in obj) {

      if (typeof(obj[attr])=="object") {
          readJson(obj[attr])
      } else {
      //  if(isProperties) {
          final[attr] = obj[attr];
      //  }//
        isProperties = true;
      }

    }

  }

  readJson(ss);

  var f = {};
  f["@"] = final;

  console.log(JSON.stringify(f));





    app.listen(3000, function(){
      console.log("Express server listening on port 3000");
    });
