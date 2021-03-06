var express = require('express')
  , routes = require('./routes/routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
/**
    RULE
*/
app.get('/rules/:ruleId', routes.getRule);
app.post('/rules/create', routes.createRule);
app.put('/rules/:ruleId', routes.updateRule);
app.delete('/rules/:ruleId', routes.deleteRule);
app.post('/stories/search', routes.storySearch);
app.get('/xml', routes.xmlGen);
app.get('/js2js', routes.js2js);
app.get('/merge', routes.merge);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
