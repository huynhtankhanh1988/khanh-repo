var querystring = require('querystring');
var https = require('https');
var company = require("../model/company");
var Client = require('node-rest-client').Client;


exports.updateRule = function(req, respone) {
    console.log("START CREATE ASSOCIATE RULE ");
  var client = new Client();
  var headers = {};
  var responseString = '';

  var body = '<rule xmlns="http://api.worldnow.com/cms" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">'
                  + '<activestatus>Active</activestatus>'
                  + '<affiliateid>6</affiliateid>'
                  + '<featuretype>Clip</featuretype>'
                  + '<name>Test Update clip rule 15012</name>'
            + '</rule>' ;
  var headers = {
    'Authorization':'struong~worldnow113~6',
    'Content-Type': 'application/xml'
  };

  var args ={
  		headers: headers,
  		data: body
  	  };

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      client.put("https://cms.ddev1.worldnow.com/v1.0/rules/15020", args, function(data, response){
      			// parsed response body as js object
      			console.log(data);
            respone.render('company/index', { title:  data})
      			// raw response
      			console.log(response);
      });

  //respone.render('company/index', { title:  "responseString"})
  console.log("END CREATE ASSOCIATE RULE ");
}
exports.getRule = function(req, respone) {
  console.error("START GET RULE");
  var headers = {};
  var responseString = '';
  headers = {
    'Authorization':'struong~worldnow113~6',
    'Content-Type': 'application/xml'
  };
  var options = {
    host: 'cms.ddev1.worldnow.com',
    path: '/v1.0/rules/15019',
    method: 'GET',
    headers: headers
  };

 company.name = "Infonam"

 process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');
    res.on('data', function(data) {
      responseString += data;
      respone.render('company/index', { title:  responseString})
    });
  });

  req.end();
  req.on('error', function(e) {
      console.error(e);
  });
  console.error("STOP INDEX");
}


exports.createRule = function(req, respone) {
    console.log("START CREATE ASSOCIATE RULE ");
  var client = new Client();
  var headers = {};
  var responseString = '';

  var body = '<rule xmlns="http://api.worldnow.com/cms" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">'
                  + '<activestatus>Active</activestatus>'
                  + '<affiliateid>6</affiliateid>'
                  + '<featuretype>Clip</featuretype>'
                  + '<name>test clip rule</name>'
            + '</rule>' ;
  var headers = {
    'Authorization':'struong~worldnow113~6',
    'Content-Type': 'application/xml'
  };

  var args ={
  		headers: headers,
  		data: body
  	  };

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      client.post("https://cms.ddev1.worldnow.com/v1.0/rules", args, function(data, response){
      			// parsed response body as js object
      			console.log(data);
            respone.render('company/index', { title:  data})
      			// raw response
      			console.log(response);
      });

  //respone.render('company/index', { title:  "responseString"})
  console.log("END CREATE ASSOCIATE RULE ");
}






exports.create = function(req, respone) {
    console.log("START CREATE ASSOCIATE RULE ");
  var client = new Client();
  var headers = {};
  var responseString = '';

  var body = '<associationrule xmlns="http://api.worldnow.com/cms" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">'
                  + '<featureid>24707371</featureid>'
                  + '<featuretype>Story</featuretype>'
                  + '<order>1</order>'
                  + '<rule>'
                        + '<id>14671</id>'
                  + '</rule>'
            + '</associationrule>' ;
  var headers = {
    'Authorization':'struong~worldnow113~6',
    'Content-Type': 'application/xml'
  };

  /*
  var options = {
    host: 'cms.ddev1.worldnow.com',
    path: '/v1.0/associaterules',
    method: 'POST',
    headers: headers,
    content: body
  };
  */

  var args ={
  		path: '/v1.0/associaterules',
  		headers: headers,
  		data: body
  	  };

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      client.post("https://cms.ddev1.worldnow.com/v1.0/associaterules", args, function(data, response){
      			// parsed response body as js object
      			console.log(data);
            respone.render('company/index', { title:  data})
      			// raw response
      			console.log(response);
      });

  //respone.render('company/index', { title:  "responseString"})
  console.log("END CREATE ASSOCIATE RULE ");
}


exports.index = function(req, respone) {
  console.error("START INDEX");
  var headers = {};
  var responseString = '';
  headers = {
    'Authorization':'struong~worldnow113~6',
    'Content-Type': 'application/xml'
  };
  var options = {
    host: 'cms.ddev1.worldnow.com',
    path: '/v1.0/menu/6',
    method: 'GET',
    headers: headers
  };

 company.name = "Infonam"

 process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');
    res.on('data', function(data) {
      responseString += data;
      respone.render('company/index', { title:  responseString})
    });
  });

  req.end();
  req.on('error', function(e) {
      console.error(e);
  });
  console.error("STOP INDEX");
}


exports.copy = function(request, respone){
  console.log("START COPY ASSOCIATE RULE ");
  var responseString = '';
  var headers = {
    'Authorization':'struong~worldnow113~6',
    'Content-Type': 'application/xml'
  };
  var options = {
    host: 'cms.ddev1.worldnow.com',
    path: '/v1.0/rules/15002',
    method: 'COPY',
    headers: headers
  };


  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
   var req = https.request(options, function(res) {
     res.setEncoding('utf-8');
     res.on('data', function(data) {
       responseString += data;
       respone.render('company/index', { title:  responseString})
     });
     req.on('error', function(e) {
         console.error(e);
     });
   });

   req.end();
   console.log("END COPY ASSOCIATE RULE ");

}


exports.delete = function(request, respone){
  console.log("START DELETE ASSOCIATE RULE ");
  var responseString = '';
  var headers = {
    'Authorization':'struong~worldnow113~6',
    'Content-Type': 'application/xml'
  };
  var options = {
    host: 'cms.ddev1.worldnow.com',
    path: '/v1.0/rules/15019',
    method: 'DELETE',
    headers: headers
  };


  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
   var req = https.request(options, function(res) {
     res.setEncoding('utf-8');
     res.on('data', function(data) {
       responseString += data;
       respone.render('company/index', { title:  responseString})
     });
     req.on('error', function(e) {
         console.error(e);
     });
   });

   req.end();
   console.log("END DELETE ASSOCIATE RULE ");

}



exports.createAssociateRule = function(req, respone) {
    console.log("START CREATE ASSOCIATE RULE ");
  var headers = {};
  var responseString = '';

  var body = '<associationrule xmlns="http://api.worldnow.com/cms" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">'
                  + '<featureid>24707371</featureid>'
                  + '<featuretype>Story</featuretype>'
                  + '<order>1</order>'
                  + '<rule>'
                        + '<id>14671</id>'
                  + '</rule>'
            + '</associationrule>' ;

  var length = Buffer.byteLength(body);
  var headers = {
    'Authorization':'struong~worldnow113~6',
    'Content-Type': 'application/xml',
    'Content-Length': length
  };

  var options = {
    host: 'cms.ddev1.worldnow.com',
    path: '/v1.0/associaterules',
    method: 'POST',
    headers: headers,
    content: body
  };


 process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');
    res.on('data', function(data) {
      responseString += data;
      respone.render('company/index', { title:  responseString})
    });
    req.on('error', function(e) {
        console.error(e);
    });
  });

  req.end();
  console.log("END CREATE ASSOCIATE RULE ");
}
