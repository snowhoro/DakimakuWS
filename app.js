var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var config = require('./config');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.locals = config;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*app.all('*', function(req,res,next){
  console.log("hola peroooooooo4o4o23o5o");
  next();
});*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});
/*app.use('/', routes);
app.use('/users', users);*/
app.use(function(err,req,res,next){
    res.writeHeader(500, {'Content-Type' : "text/html"});
    res.write("<h1>" + err.name + "</h1>");
    res.end("<p style='border:1px dotted red'>" + err.message + "</p>");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  mongoose.connect(app.locals.database);
  app.use(function(err, req, res, next) 
  {
    res.status(err.status || 500);
    res.render('error', 
    {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;