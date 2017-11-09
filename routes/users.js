	var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var bcrypt = require("bcryptjs");
var db = require('../db');
var expressValidator = require('express-validator');
var path = require("path");




router.post('/register',function(req,res){

	
	var firstName = req.body.first_name;
	var lastName = req.body.last_name;
	var userName = req.body.user_name;
	var password = req.body.user_password;

	var email = req.body.email;
	var contact = req.body.contact_no;

	console.log(firstName);


			// console.log("pswd" +newUser.user_password);
			// var newUser ={};

			// bcrypt.genSalt(10, function(err, salt) {
			// 	bcrypt.hash(password, salt, function(err, hash) {
			// 		password = hash;
					// hashedPassword = password;

					var newUser = {
						"first_name": firstName,
						"last_name":lastName,
						"user_name": userName,
						"user_password": password,
						"user_email":email,
						"contact_no":contact
					};

					//  = "select count from register_users where" +newUser.user_email;
					var checkEmail = "select count(*) as em from register_users where user_email= "+ "'"+req.body.email+"'";
					console.log(checkEmail);
					db.query(checkEmail, function(err, rows, fields) {
						if (err){
							// res.status(500);
							res.json({
								status:false,
								message:'there are some errors with query'
							})

							throw err;

						} //first if
						else
						{
							var length;
							for (var i in rows) {
								length = rows[i].em;
								console.log('length: ', rows[i].em);
							};
							if(length==0)
							{
								
								var sql = "INSERT  register_users SET ?";
								var query = db.query(sql, newUser, function (err, result){



									if(err) {
										console.error('SQL error: ', err);
										// res.status(500);
										// res.send(result);
										res.json({
											status:false,
											message:'there are some error with query'
										})

									}


									else{

										// res.status(200,result);
										// res.send(result);





										res.json({
											status:true,
											data:result,
											message:'user registered sucessfully',
											redirect:'/login'
										});



										




									}

								});



							}//second if

							else{

								// res.status(500);
								// res.send("emailExists");
								
								// res.writeHead(400, 'email id already exists', {'content-type' : 'text/plain'});
								console.log("email id already exists");
								res.json({
									status:false,
									message:'email id already exists'
								})

							}//second else

						}//first else
						
				// 	});brrypt

				// });brypt
			});






		});




router.post('/login',function(req,res){

	var email = req.body.emailName;
	var password= req.body.user_password;

	db.query('SELECT * FROM register_users WHERE user_email = ?',[email], function (error, results, fields) {
		if (error) {
			res.json({
				status:false,
				message:'there are some error with query'
			})
		}else{
			if(results.length >0){
				// bcrypt.genSalt(10, function(err, salt) {
				// 	bcrypt.hash(password, salt, function(err, hash) {
				// 		password = hash;
						console.log(password);

						if(password===results[0].user_password){
							console.log("sql"+ results[0].user_password)
							// var sql = "SELECT UserId from register_users as user_id where user_email = "+ "'"+req.body.emailName+"'";
							var sql = "select * from register_users where user_email = "+ "'"+req.body.emailName+"'";
							db.query(sql,function(err,results,fields){

								// const user_id = JSON.stringify(results[0]);
								const user_id = results[0];
								console.log("results" +JSON.stringify(results[0]));

								res.json({
									status:true,
									data:user_id,
									message:'successfully authenticated',
													//redirect:'/login'

									 });

							});


						//user session
					}
					else{
						res.json({
							status:false,
							message:"Email and password does not match"
						});
					}


				// });//brcypt
				// });//bcrypt

				}
				else{
					res.json({
						status:false,    
						message:"Email does not exits"
					});
				}
			}
		});


	});

module.exports = router;
