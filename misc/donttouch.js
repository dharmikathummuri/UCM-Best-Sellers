var express = require("express");
var router = express.Router();
var app = express();
var path = require("path");
var port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
var multipart = require('parse-multipart');
var cookieParser = require('cookie-parser');
var busboyBodyParser = require('busboy-body-parser');
var moment = require('moment');
var now = moment();
var formatted = now.format('HH:mm:ss Z');
var cons = require('consolidate');
var db = require('./db');
var ExpressFileUpload= require('express-fileupload');
var expressValidator = require('express-validator');

var posts = require('./routes/posts');
var routes = require('./routes/index');
var users = require('./routes/users');


app.use(bodyParser.urlencoded({
  extended: false
}));

//parse application/json
app.use(ExpressFileUpload());
// app.use(bodyParser.json());
app.use(busboyBodyParser());

app.listen(port);

app.use('/',routes);
app.use('/users',users);

app.use('/posts',posts);
app.use(expressValidator());


app.use(express.static(__dirname+'/client'));

app.use(express.static(__dirname+'/uploads'));

app.set('client', __dirname+ '/client');

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '/client'));
app.set('view engine', 'html');


app.post('/upload',function(req,response){


    console.log("files"+req.files.myFile1.name);
    console.log("body"+req.body);


});


//post


router.post('/upload',function(req,response){

	try{

		console.log("files"+req.files);
		console.log("body"+req.body);


		// if(req.files){



			var reqObj = req.body;
			var file = req.files.myFile;
			var myFile = file.name;


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

			


		// }
		// else{

		// 	console.log("no files uploded");
		// 	response.send("wrongData");
		// 	response.status("500");

		// }
		
		



		



	}
	catch(ex){
		console.error("Internal error:"+ex);
		
	}

});

//carousel multiple

     <!-- carousel strt -->

            <div id="{{exp.ad_category}}" class="something carousel slide" data-ride="carousel" data-interval="2000">
              <!-- Indicators -->
              <ol class="carousel-indicators">
                <li data-target="#{{exp.ad_category}}" data-slide-to="0" class="active"></li>
                <li data-target="#{{exp.ad_category}}" data-slide-to="1"></li>
                <li data-target="#{{exp.ad_category}}" data-slide-to="2"></li>
                <!-- <li data-target="#myCarousel" data-slide-to="3"></li> -->
              </ol>

              <!-- Wrapper for slides -->
              <div class="carousel-inner" role="listbox">

                <div class="item active">
                  <img src="{{exp.images}}" alt="Chania" class="fixed-height img-responsive">
                  <div class="carousel-caption">
                    
                  </div>
                </div>

                <div class="item">
                  <img src="{{exp.image2}}" alt="Chania" class="fixed-height img-responsive">
                  <div class="carousel-caption">
                   
                  </div>
                </div>

                <div class="item">
                  <img src="{{exp.image3}}" alt="Flower" class="fixed-height img-responsive">
                  <div class="carousel-caption">
                  
                  </div>
                </div>

                

              </div>

              <!-- Left and right controls -->
              <a class="left carousel-control" data-target="#{{exp.ad_category}}" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="right carousel-control" data-target="#{{exp.ad_category}}" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>


            <!-- carousel end -->


             <!-- class="dropdown" -->
             <!--  <a  href="#">Page 1
              <span class="caret"></span></a> -->
<!-- 
              <a href="" class="dropdown-toggle" data-toggle="dropdown">Search by category&nbsp;<span class="caret"></span></a></a>  
              <ul class="dropdown-menu">
                <li><a href="" ng-click="category('cars')"><span title="">Cars</span></a></li>
                <li><a href="" ng-click="category('Furniture')"><span title="">Furniture</span></a></li>
                <li><a href="" ng-click="category('electronics')"><span title="">Electronics</span></a></li>
                <li><a href="" ng-click="category('Phones')"><span title="">Phones</span></a></li>
                <li><a href="" ng-click="category('fashion')"><span title="">Fashion</span></a></li>
                <li><a href="" ng-click="category('accomodations')"><span title="">Accomodations</span></a></li>

              </ul> 
            -->
 myApp.factory('Auth',['$cookies','$window',function($cookies,$window){
  var user={};

return{
  setUser : function(aUser){


    user = aUser;
    console.log("userId " + user.data.first_name);

    var expireDate = new Date(); 
    expireDate.setDate(expireDate.getDate() + 1); 
    $cookies.put("userCookie",user,{expires: expireDate
      });
    
    
  },
  isLoggedIn : function(){
    // return(user)? user : false;
    
    if(user==""){

      return false;
    }

    else{

      return true;

    } 
  },
  logout: function(){
  

        user=""
        console.log("logout");
        $cookies.remove("userCookie");
      
        return true;
        


    


  },//end logout

  getUser: function(){

    return user;


  }


  }//return
}]);

