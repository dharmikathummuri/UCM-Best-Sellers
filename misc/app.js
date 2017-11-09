var express = require("express");
var router = express.Router();
var app = express();

var request = require('request');
var path = require("path");
var port = process.env.PORT || 8000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multipart = require('parse-multipart');
var cookieParser = require('cookie-parser');


var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var busboyBodyParser = require('busboy-body-parser');
var cors = require('cors');
var multiparty = require('multiparty');
var ExpressFileUpload= require('express-fileupload');
var moment = require('moment');
var now = moment();
var formatted = now.format('HH:mm:ss Z');
var cons = require('consolidate');
var db = require('./db');

//routes
var posts = require('./routes/posts');
var routes = require('./routes/index');
var users = require('./routes/users');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

//parse application/json
app.use(ExpressFileUpload());
// app.use(bodyParser.json());
app.use(busboyBodyParser());

app.listen(port);



//parse multipart/form-data    



app.use('/',routes);
app.use('/users',users);

app.use('/posts',posts);
app.use(expressValidator());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE,PUT");
  next();
});

// parse application/x-www-form-urlencoded



app.use(cors());
// app.use(upload());


// app.use(express.static(__dirname+'/client/views'));

app.use(express.static(__dirname+'/client'));

app.use(express.static(__dirname+'/uploads'));

app.set('client', __dirname+ '/client');


//for validating file
// app.use(validator({
//   customValidators: {
//     isJPG: function(value, filename) {
//       var extension = (path.extname(filename)).toLowerCase();
//       return extension == '.jpg';
//     }
//   }
// }));

// req.checkBody('myfile', 'Please upload your file in PDF').isPDF(req.files.myfile.name);

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '/client'));
app.set('view engine', 'html');



app.use(cookieParser());

app.use(session({

  secret:'secret',
  saveUninitialized: true,
  resave:true

}));
app.use(flash());

//global varibles for flash
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.post('/upload',function(req,response){

  try{

    console.log("files"+req.files);
    console.log("body"+req.body);





    var reqObj = req.body;
    var file1 = req.files.myFile1;
    var file2 = req.files.myFile2;
    var file3 = req.files.myFile;


    console.log("req files"+req.files.myFile)
    var myFile1 = file1.name;
    var myFile2= file1.name;
    var myFile3 = file1.name; 

      file.mv("./uploads/"+ myFile,function(err){
        if(err){

          console.log(err);
        }
        else{

          console.log("successfully uploaded");
        }

      });
   



   var insertSql = "INSERT INTO post_ad SET ?";
   var insertValues = {
    "ad_title" : reqObj.adTitle,
    "ad_category" : reqObj.categorySel,
    "ad_description" : reqObj.adDesc,
    "name":reqObj.yourName,
    "phone":reqObj.contact,
    "posted_date":reqObj.postDate,
    "images": myFile
    
  };


  var query = db.query(insertSql, insertValues, function (err, result){
    if(err){
      console.error('SQL error: ', err);
          //return next(err);
        }

      });












}
catch(ex){
  console.error("Internal error:"+ex);

}

});








