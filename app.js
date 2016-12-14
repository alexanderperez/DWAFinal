var express = require('express');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser')
var Mongoose = require('mongoose');
var passport = require('passport');

var app = express();

require('dotenv').config();

Mongoose.connect(process.env.DB_URL);

var portNum = 8888;
app.set('port', portNum);

// tell express to use handlebars
app.engine('handlebars', hbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/ap', require('./routes/ap'));

app.use( express.static('public') );

require('./routes')(app, passport);

// start server
app.listen(portNum, function() {
  console.log('listening on port ', portNum);
});