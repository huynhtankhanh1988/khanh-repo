var https = require('https');
var express = require('express');
var Client = require('node-rest-client').Client;
/*
get poll
*/
exports.getPoll = function(req, res) {
  console.log("param~ " + req.params.id);
  var end_point = "/v1.0/polls/" +  req.params.id;

   var options = {
     host: 'cms.ddev1.worldnow.com',
     path: end_point,
      method: 'GET',
      headers: {
        'Authorization': 'struong~worldnow113~6',
        'Content-Type': 'application/xml',
        'access-control-allow-origin': '*'
      }
   };

   // do the GET request
   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
   var reqGet = https.request(options, function(response) {
       response.on('data', function(d) {
         res.render('poll', { title: d })
       });

   });

   reqGet.end();
   reqGet.on('error', function(e) {
       console.error(e);
   });
};

/*
search polls
*/
exports.searchPolls = function(req, res){
  var client = new Client();
  // prepare body
  var body = '<pollsearchcriteria xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://api.worldnow.com/cms"><affiliateid>6</affiliateid></pollsearchcriteria>';

  var args = {
  		headers: {'Authorization': 'struong~worldnow113~6',
                'Content-Type': 'application/xml'
              },
  		data: body
  	  };

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      client.post("https://cms.ddev1.worldnow.com/v1.0/polls/search", args, function(data, response){
      			console.log(data);
            res.render('poll', { title:  data})
      			console.log(response);
      });
  console.log("End search polls");
};

/*
create poll
*/
exports.createPoll = function(req, res){
  var client = new Client();
  // prepare body
  var body = '<poll xmlns="http://api.worldnow.com/cms" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">'
              +'<question>How are you???</question>'
              +'<responses>'
              +'<pollresponse>'
              +'<response>OK</response>'
              +'</pollresponse>'
              +'<pollresponse>'
              +'<response>Sick</response>'
              +'</pollresponse>'
              +'</responses>'
              +'</poll>';

  var args = {
  		headers: {'Authorization': 'struong~worldnow113~6',
                'Content-Type': 'application/xml'
              },
  		data: body
  	  };

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      client.post("https://cms.ddev1.worldnow.com/v1.0/polls", args, function(data, response){
      			console.log(data);
            res.render('poll', { title:  data})
      			console.log(response);
      });
  console.log("End create a new poll");
};

/*
update a poll
*/
exports.updatePoll = function(req, res){
  console.log("param~ " + req.params.id);
  var end_point = "/v1.0/polls/" +  req.params.id;
  var client = new Client();
  // prepare body
  var body = '<poll xmlns="http://api.worldnow.com/cms" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">'
  +'<id>137150</id>'
  +'<linkdescription>Poll Link Description</linkdescription>'
  +'<linkurl>www.worldnow.com</linkurl>'
  +'<minvotestodisplayresult>10</minvotestodisplayresult>'
  +'<preresultmessage>Thank you for participating in our poll! 10pm for the results!</preresultmessage>'
  +'</poll>';

  var args = {
  		headers: {'Authorization': 'struong~worldnow113~6',
                'Content-Type': 'application/xml'
              },
  		data: body
  	  };

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      client.put("https://cms.ddev1.worldnow.com" + end_point, args, function(data, response){
      			console.log(data);
            res.render('poll', { title:  data})
      			console.log(response);
      });
  console.log("End update a poll");
};
