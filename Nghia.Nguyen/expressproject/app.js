
/**
 * Module dependencies.
 */

  var express = require('express')
  var routes = require('./routes');
  var https = require('https');
  var request = require('request');
  var fs = require("fs");
  var bodyParser = require('body-parser');
  var xmlparser = require('express-xml-bodyparser');
  var ctl = require('./controller/controller');
  var multer = require('multer'); // v1.0.5
  var upload = multer(); // for parsing multipart/form-d

  var app = module.exports = express();
  /*
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(xmlparser());
  var urlencodedParser = bodyParser.urlencoded({ extended: false });
  var url = require('url');
  */


// Configuration
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

// Routes
app.get('/', function(req, res) {
  fs.readFile( __dirname + "/" + "association.xml", 'utf8', function (err, data) {
    console.log( data );
    res.end( data );
  });
});

app.get('/menu/:id', routes.index1);
app.post('/links/search', routes.index2 );

app.listen(9000, function(){
  console.log("Express server listening on port 9000");
});
