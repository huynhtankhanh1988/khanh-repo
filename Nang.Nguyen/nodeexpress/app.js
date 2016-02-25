
/**
 * Module dependencies.
 */

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
app.get('/polls/getpoll/:id', routes.get_poll);
app.get('/polls/search', routes.search_polls);
app.get('/polls', routes.create_poll);
app.get('/polls/updatepoll/:id', routes.update_poll);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
