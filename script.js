var express = require("express");
var router = express.Router();
var app = express();
var path = require("path");
var port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
var multipart = require('parse-multipart');
var cookieParser = require('cookie-parser');
var busboyBodyParser = require('busboy-body-parser');
// var moment = require('moment');
// var now = moment();
// var formatted = now.format('HH:mm:ss Z');
var cons = require('consolidate');
var db = require('./db');
var ExpressFileUpload= require('express-fileupload');
// var expressValidator = require('express-validator');

var posts = require('./routes/posts');
var routes = require('./routes/index');
var users = require('./routes/users');
var details = require('./routes/details');

app.use(bodyParser.urlencoded({
  extended: false
}));

//parse application/json
app.use(ExpressFileUpload());
app.use(bodyParser.json());
app.use(busboyBodyParser());

app.listen(port);

app.use('/',routes);
app.use('/users',users);
app.use('/details',details);
app.use('/posts',posts);
// app.use(expressValidator());


app.use(express.static(__dirname+'/client'));

app.use(express.static(__dirname+'/uploads'));

app.set('client', __dirname+ '/client');

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '/client'));
app.set('view engine', 'html');



