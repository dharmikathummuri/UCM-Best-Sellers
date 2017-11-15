
//api for posting adds

var express = require('express');
var router = express.Router();

var db = require('../db');



router.post('/upload',function(req, response) {


	// console.log(req.files.myFile);
	console.log(req.body);




	var reqObj = req.body;
	console.log("tpe" +reqObj.optradio);

	var file1 = req.files.myFile;



    console.log("req files"+req.files.myFile.name)
    var myFile1 = file1.name;



      //start

      if(myFile1!="")
      {
      	file1.mv("./uploads/"+ myFile1,function(err){
      		if(err){

      			console.log(err);
      			response.send(err);
      		}
      		else{

      			console.log("successfully uploaded file1");
  
      		var insertSql = "INSERT INTO post_ad SET ?";
      			var insertValues = {
              
              "UserId": reqObj.userId,
      				"ad_title" : reqObj.adTitle,
      				"ad_category" : reqObj.categorySel,
      				"ad_description" : reqObj.adDesc,
      				"name":reqObj.yourName,
      				"phone":reqObj.contact,
      				"posted_date":reqObj.postDate,
      				"type": reqObj.optradio,
      				"images": myFile1,
              "disabled":reqObj.disabled

      			}; 


      			var query = db.query(insertSql, insertValues, function (err, result){
      				if(err){
      					console.error('SQL error: ', err);
      					response.send(err);
          			//return next(err);
    			  }else{


    			  	response.send(result);
    			  }

				  });//end query

      		}

      	});
      }
      // first file upload into local storage


      




  });

router.get('/getStatus/:_id',function(req,res){

    var pid = req.params._id;
    console.log("pid"+pid);
    var sql = "select disabled from post_ad where id="+"'"+pid+"'";
     db.query(sql,function(err,results){
            if(err){

              console.log(err);
            }
            else{
              console.log("hello from disabled");
              console.log(results);
                // res.json({
                //       status:true,
                //       message:'updated',
                //       data:results
                //     })
              
            }

        });


});

router.get('/disabled',function(req,res){

  console.log(JSON.stringify(req.query.uid));
  console.log(req.query.condition);
  var cond =req.query.condition;
  var uid = req.query.uid;

      if(cond=="disabled"){
        var sql = "update post_ad set disabled='yes' where id="+"'"+uid+"'";
      }

      if(cond=="enabled"){
        var sql = "update post_ad set disabled='no' where id="+"'"+uid+"'";
      }



      console.log(sql);
          db.query(sql,function(err,rows,fields){
            if(err){

              console.log(err);
            }
            else{
              console.log("hello from disabled");
              console.log(rows);
                res.json({
                      status:true,
                      message:'updated'
                    })
              
            }

        });
        



});

router.get('/getname/:_id',function(req,res){

    var uid = req.params._id;

      var sql = "select first_name,last_name from register_users where UserId="+"'"+uid+"'";

      db.query(sql,function(err,results){

        if(err){
          console.log(err);
        }
        else{

          console.log(results[0].first_name);
           console.log(results[0].last_name);
           res.send(JSON.stringify({

                "firstName" : results[0].first_name,
                "lastName": results[0].last_name


              }));


        }


      });


});
router.get('/sendMessage',function(req,res){


   var sendTo = req.query.sendingToId;
   var sentFrom = req.query.sentFromId;
   var messageText = req.query.MessageText;
   var subject = req.query.subject;
   var sentDate =req.query.senTdate;
   var Uname = req.query.uname;
   var senderDeleted = req.query.senderDeleted;
   var recieverDeleted= req.query.recieverDeleted;
   var senToname = req.query.sentTo;

   console.log("sendMessage" +sendTo);
   console.log("sendMessage" +sentFrom);
   console.log("sendMessage" +messageText);
   console.log("sendMessage" +subject);

   var insertSql = "INSERT INTO user_messages SET ?";
   var insertMessage ={
      "senderId":sentFrom,
      "recieverId":sendTo,
      "subject":subject,
      "message":messageText,
      "msg_date":sentDate,
      "name": Uname,
      "senderDeleted":senderDeleted,
      "recieverDeleted":recieverDeleted,
      "sentToName":senToname
  }
      db.query(insertSql, insertMessage, function (err, result){
              if(err){
                console.error('SQL error: ', err);
                res.send(err);
                res.json({
                      status:true,
                      data:result,
                      message:'message sent',
                      redirect:'none'
                    });
                //return next(err);
            }else{

              console.log(result);
              // res.send(JSON.stringify(result));

              res.json({
                      status:true,
                      data:result,
                      message:'message sent',
                      redirect:'/home'
                    });
            }

          });//end query




});


router.get('/likedPosts',function(req,res){

  

  console.log(JSON.stringify(req.query.userId));
 
    var uid = req.query.userId;
    console.log("yayyy " + uid);
    var sql = "select distinct a.id, a.ad_title,a.ad_description,a.name,a.phone,a.posted_date,a.type,a.images,a.UserId FROM post_ad a,likes ba where a.id=ba.postId and ba.Uid=" +"'"+uid+"'";
    db.query(sql,function(err,results){
    if(err){

      console.log(err);
    }
    else{
      // console.log(results);
      res.send(results);
      console.log(results);
    }

  });

});



//api for getting ads

router.get('/postedAds',function(req,res){
	
	// console.log("type" +type);
	var sql = "SELECT * FROM post_ad where type='Sell'";
	db.query(sql,function(err,results){
		if(err){

			console.log(err);
		}
		else{
			// console.log(results);
			res.send(results);
			console.log(results);
		}

	});

});


router.get('/postedDonations',function(req,res){
	
	// console.log("type" +type);
	var sql = "SELECT * FROM post_ad where type='Donate'";
	db.query(sql,function(err,results){
		if(err){

			console.log(err);
		}
		else{
			// console.log(results);
			res.send(results);
			console.log(results);
		}

	});

});
//app to get single post






module.exports = router;