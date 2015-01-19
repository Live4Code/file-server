var express = require('express');
var path = require('path');
var morgan = require('morgan');
var methodOverride = require('method-override');

var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride());

require('./routes')(app); // load our routes and pass in our app

app.set('port', process.env.PORT || 3005);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
