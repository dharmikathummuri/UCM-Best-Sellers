var express = require('express');
var router = express.Router();
var ExpressFileUpload= require('express-fileupload');

var db = require('../db');

router.get('/select',function(req,res){
	
	// console.log("type" +type);
	var cat = req.query.category;
	console.log("len"+cat.length);
	var sql = "SELECT * FROM post_ad where ad_category="+"'"+cat+"'";
	console.log(sql);
	db.query(sql,function(err,rows,fields){
		if(err){

			console.log(err);
		}
		else{
			// console.log(results);
			console.log(JSON.stringify(rows));
			res.send(JSON.stringify(rows));
			
		}

	});

});
router.delete('/deleteMessage',function(req,res){

		var mid = req.query.uid;

		var sql;
		console.log("len hello "+ JSON.stringify(req.query.condition));
				var con = req.query.condition;

			if(con=="sent"){

				 sql = "update user_messages set senderDeleted='yes' where message_id=" +mid;


			}
			if(con=="recieved"){

				 sql = "update user_messages set recieverDeleted='yes' where message_id=" +mid;


			}
		

		console.log(sql);
		db.query(sql,function(err,rows,fields){
			if(err){

				console.log(err);
			}
			else{
				console.log("hello from deleter");
					res.json({
								status:true,
								message:'message deleted'
							})
				
			}

	});
	



});

router.get('/getMessages',function(req,res){
	
	var usid = req.query.uid;
	console.log(JSON.stringify(req.query.uid)+"hello");
	console.log(JSON.stringify(req.query.condition)+"hello");
		var con = req.query.condition;



	var sql;
	console.log("len"+req.params._id);

	if(con=="sent"){
	 sql = "select * from user_messages where senderId="+"'"+usid+"'" +"and senderDeleted='no'";
	}

	if(con=="recieved"){
		sql = "select * from user_messages where recieverId="+"'"+usid+"'" +"and recieverDeleted='no'";
	}


	console.log(sql);
	db.query(sql,function(err,rows,fields){
		if(err){

			console.log(err);
		}
		else{
			// console.log(results);
			console.log(JSON.stringify(rows));
			res.send(JSON.stringify(rows));
			
		}

	});

});

router.get('/getLikes',function(req,res){
	console.log("getlikes" +req.query);
	var uid = req.query.userId;
	var postId = req.query.postId;
	console.log(uid +"and"+ postId)
	var countQuery = "select count(*) as userLikes from likes where postId=" + "'"+postId+"'" ;
	var thisUserLike;
	var allLikes;
	db.query(countQuery,function(err,results){
		
		// if(err){

		// 	console.log(err);
		// }
		// else{
			// console.log(results);
			console.log(results);
			allLikes = results[0].userLikes;
			var sqlQuery ="select count(*) as thisUserLikes from likes where  postId=" + "'"+postId+"'" +"and Uid="+"'"+uid+"'";
				
				db.query(sqlQuery,function(err,results){

					if(err){

						console.log(err);
						}
						else{
							console.log("this userLikes"+JSON.stringify(results));
							console.log(results[0].thisUserLikes);
							thisUserLike = results[0].thisUserLikes;
							var likesData= {

								"likes" : allLikes,
								"userLikes":thisUserLike


							}
							console.log("likes data"+JSON.stringify({

								"likes" : allLikes,
								"userLikes":thisUserLike


							}));
							res.send(JSON.stringify({

								"likes" : allLikes,
								"userLikes": thisUserLike


							}));

						}



				})
			//res.send(results);
			
		// }

	});

});

router.get('/getPostedUserId/:_id',function(req,response){

		var postid = req.params._id;

		var sql = "select UserId from post_ad where id="+"'"+postid+"'";

		db.query(sql,function(err,results){

			if(err){
				console.log(err);
			}
			else{

				console.log(results);
				response.send(results);


			}


		});



});

// router.get('/getPostedUserName/:_id',function(req,response){

// 		var postid = req.params._id;

// 		var sql = "select UserId from post_ad where id="+"'"+postid+"'";

// 		db.query(sql,function(err,results){

// 			if(err){
// 				console.log(err);
// 				}
// 				console.log("inside query");

// 				console.log(results);
// 				var uid = results[0].UserId;

// 				var sqlQuery = "select first_name,last_name from register_users where UserId="+"'"+uid+"'";

// 				db.query(sqlQuery,function(err,results){
// 					if(err){
// 				  		console.log(err);
// 						}


// 					else{

// 					  		console.log(results[0].first_name);
// 					  		 console.log(results[0].last_name);
// 					  			response.send(JSON.stringify({

// 								"firstName" : results[0].first_name,
// 								"lastName": results[0].last_name


// 						 		 }));


// 						}
// 				})
				
// 			// else{

// 			// 	console.log(results);
// 			// 	response.send(results);


// 			// }


// 		});



// });

router.get('/getPostedAdTitle/:_id',function(req,response){

		var postid = req.params._id;

		var sql = "select ad_title from post_ad where id="+"'"+postid+"'";

		db.query(sql,function(err,results){

			if(err){
				console.log(err);
			}
			else{

				console.log(results);
				response.send(results[0].ad_title);


			}


		});



});


router.post('/likes',function(req,res){

	console.log(JSON.stringify(req.body));

	console.log(JSON.stringify(req.body.params.userId));
	console.log(req.body.postId);
	console.log(req.body.like);

	var uid = req.body.params.userId;
	var postId = req.body.params.postId;
	var like = req.body.params.like;
		var userLikes={
			"liked":like,
			"Uid":uid,
			"postId": postId


		}

		var sql = "insert into likes SET ?";
		db.query(sql,userLikes,function(err,results){
					if(err){

						console.log(err);
						res.json({
									status:false,
								
									message:'error',
									

							 });
					}
					else{
						 //console.log("hi update");
					  
				var countQuery = "select count(*) as userLikes from likes where  postId=" + "'"+postId+"'" ;
				//Uid="+"'"+uid+"'"+ "and
						db.query(countQuery,function(err,results){

										if(err){

											console.log(err);
											res.json({
														status:false,
														
														message:'error'
									

													 });
											}

											else{
												console.log("user likes"+ JSON.stringify(results[0].userLikes));
												var respi = JSON.stringify(results[0].userLikes);
												res.json({

														status:true,
														data:respi,
														message:'success'
									

													 });


											}
										});
									}




					

		 });






});

router.put('/updateProfile/:_id',function(req,res){

	console.log(JSON.stringify(req.body));
	var email = req.body.user_email;
	var firstName = req.body.first_name;
	var lastName = req.body.last_name;
	var userName = req.body.user_name;
	var password = req.body.user_password;
	var contact = req.body.contact_no;

	console.log(contact);

					var editUser = {
						"first_name": firstName,
						"last_name":lastName,
						"user_name": userName,
						"user_password": password,
						"user_email":email,
						"contact_no":contact
					};

	
					var id = req.params._id;
					var sql = "UPDATE register_users SET ? WHERE UserId="+id;

				db.query(sql,editUser,function(err,results){
					if(err){

						console.log(err);
						res.json({
									status:false,
								
									message:'error',
									

							 });
					}
					else{
					  console.log("hi update");
					  
					  res.json({
									status:true,
									data:results,
									message:'successfully updated',
									redirect:'/home'

							 });


					  console.log(results);
					}

				  });


});



router.get('/profile/:_id',function(req,res){

	var id = req.params._id;
  console.log("type" +id);
  var sql = "SELECT * FROM register_users where UserId="+id;
  db.query(sql,function(err,results){
	if(err){

		console.log(err);
	}
	else{
	  console.log("hi");
	  res.send(results);
	  console.log(results);
	}

  });


});

router.get('/posts/:_id',function(req,res){
	
  var id = req.params._id;
  console.log("type" +id);
  var sql = "SELECT * FROM post_ad where UserId="+id;
  db.query(sql,function(err,results){
	if(err){

		console.log(err);
	}
	else{
	  
	  res.send(results);
	  console.log(results);
	}

  });

});


router.get('/postDetails/:_id',function(req,res){

	
	var id = req.params._id;
	var sql = "SELECT * from post_ad where id="+id;
	console.log("inside post details");
	db.query(sql,function(err,results){
		if(err){

			console.log(err);
			res.send(err);
		}
		else{
			// console.log(results);
			res.send(JSON.stringify(results));
			console.log("print" + JSON.stringify(results) );
		}

	});
	
	
});
//api to update post

router.put('/update/:_id',function(req,res){

	console.log("in update")
	var reqObj = req.body;
	console.log("req 0 "+reqObj.ad_title);
	var fileName = req.files.myFile.name;
	// console.log(file);
	// var myFile = file.name;
	var id = req.params._id;
	var sql = "UPDATE post_ad SET ? WHERE id="+id;
	if(req.files){
		// 	console.log(formatted);

		
		var reqObj = req.body;
		var file = req.files.myFile;
		console.log(file);
		var myFile = file.name;
		// console.log(myFile);
		// console.log(reqObj);
		// console.log(file);
		
		file.mv("./uploads/"+ myFile,function(err){
			if(err){

				console.log(err);
			}
			else{

				console.log("successfully uploaded");
				var insertValues = {
					"ad_title" : reqObj.ad_title,
					"ad_category" : reqObj.ad_category,
					"ad_description" : reqObj.ad_description,
					"name":reqObj.name,
					"phone":reqObj.phone,
					"posted_date":reqObj.posted_date,
					"images": fileName,
					"UserId": reqObj.userId

				};
				var query = db.query(sql, insertValues, function (err, result){
					if(err){
						console.error('SQL error: ', err);
				//return next(err);
			}
			else{

				console.log(result);
				res.send(result);
			}
			

		});

			}

		});
		


	}
	else{

		console.log("no files uploded");

	}
	
	
});

//api for delting

router.delete('/removePost/:_id',function(req,resp){
		var id = req.params._id;
	var sqlQuery = "select images from post_ad where id="+id;
	db.query(sqlQuery,function(err,res){
			if(err){

				console.log(err+"fs");
			}
			else{




				console.log(res[0].images);
				var filename = res[0].images;
					var fs = require('fs');
				 
					fs.unlink('./uploads/'+filename, function(error) {
						if (error) {
							throw error;
						}
						console.log('Deleted '+filename);
					});


				
					var sql = "delete from post_ad where id="+id;
					db.query(sql,function(err,results){
						if(err){

							console.log(err);
						}
						else{
							// console.log(results);
							resp.send(results);
						}

					});
	
			}



	});
	
	
	
});


module.exports = router;