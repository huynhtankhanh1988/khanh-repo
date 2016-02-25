
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
  var js2xmlparser = require("js2xmlparser");
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

function parseJson(data) {
  try {
    JSON.parse(data);
  } catch (ex) {
    console.trace(ex);
    return false;
  }
  return true;
}

var jsonData = {
  "a": "a",
  "b": "b",
  "c": {
    "d":"d",
    "e":"e"
  }
};

//console.log("dirname>>"+ __dirname);
//console.log("filename>>> " + __filename);
//console.log(parseJson(jsonData));
function readJson(obj) {
  var jsonData = obj;
  for (var attr in jsonData) {
    //console.log(attr + "--" + jsonData[attr]);
  if (typeof(jsonData[attr])=="object") {
      readJson(jsonData[attr])
    }
  }
}
readJson(jsonData);


var data = {
    "firstName": "John",
    "lastName": "Smith"
};
console.log(js2xmlparser("person", data));

var xmldoc = require('xmldoc');
var document = new xmldoc.XmlDocument(js2xmlparser("person", data));
//console.log(document);

var XMLWriter = require('xml-writer')
 var fs = require('fs');
 var ws = fs.createWriteStream('./association.xml');
	ws.on('close', function() {
			console.log(fs.readFileSync('./association.xml', 'UTF-8'));
	});
	xw = new XMLWriter(false, function(string, encoding) {
			ws.write(string, encoding);
	});
	xw.startDocument('1.0', 'UTF-8').startElement(function() {
		return 'root';
	}).text(function() {
		return 'Some content';
	});
	ws.end();

  fs = require('fs');
fs.writeFile(__dirname + '/views/'+  'helloworld.xml', js2xmlparser("person", data), function (err) {
  if (err) return console.log(err);
  console.log('Hello World > helloworld.txt');
});

    var hege = "Cecilie";
    var stale = "Tobias";
    var children = hege.concat(stale);
    console.log("=====children=== " + children);

//test make dir
    fs.mkdir('/tmp/test',function(err){
   if (err) {
       return console.error(err);
   }
   console.log("Directory created successfully!");
});

app.get('/menu/:id', routes.index1);
app.post('/links/search', routes.index2 );

app.listen(3000, function(){
  console.log("Express server listening on port 9000");
});
