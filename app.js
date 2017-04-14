'use strict';
require('dotenv').config();
var express = require ("express");
var app = express ();
const bodyParser = require ("body-parser");
const expressSession = require('express-session');
const PORT = process.env.PORT || 8000;


var routes = require ("./routes/index");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret:process.env.COOKIE_SECRET}));
// ## CORS middleware
// For more info see: https://gist.github.com/cuppster/2344435
//
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://dreamhub.herokuapp.com','https://dreamhub.herokuapp.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.use("/api/users", routes.users);
app.use("/api/dreams", routes.dreams);

// app.get('/', function(req, res){
//     res.render("index", {req});
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error(req.path + 'Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.send('404');
});

app.listen(PORT, function(){
    console.log(`The server is fully operational on ${PORT}`);
});

module.exports = app;
