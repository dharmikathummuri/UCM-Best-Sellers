var mysql = require("mysql");


var db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'Sumukh123*',
	database:'ucm_best_sellers'

});

db.connect(function(error){
	if(!!error){
		console.log("error");

	}
	else{

		console.log("connected");
	}

});

// db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

module.exports = db;