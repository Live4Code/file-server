var express = require('express');
var path = require('path');
var morgan = require('morgan');
var methodOverride = require('method-override');

var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride());

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // intercept OPTIONS method
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

require('./routes')(app); // load our routes and pass in our app

app.set('port', process.env.PORT || 3005);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
