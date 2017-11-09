myApp.factory('UserFactory',['$http','$q',function($http,$q){

	var uname;
	var postTitle;
	 this.uid;
	var obj={};

	return{
	getUserId :function(postid){
			 var deferred = $q.defer();
			var id = postid;
			//var resp={};
			$http.get('/details/getPostedUserId/'+id).success(deferred.resolve)
			.error(deferred.resolve);
          			 return deferred.promise;
			
						
	},
	getUserName: function(postid){
		var id = postid;
			//var resp={};
			// var req = $http.get('/details/getPostedUserName/'+id);
   //        			return req;

          	var deferred = $q.defer();
			var id = postid;
			//var resp={};
			$http.get('/posts/getname/'+id).success(deferred.resolve)
			.error(deferred.resolve);
          			 return deferred.promise;
				


	}
	// getPostTitle:function(postid){

	// 		var id = postid;
	// 		//var resp={};
	// 		// var req = $http.get('/details/getPostedAdTitle/'+id);
 //   //        			return req;
	// 		var deferred = $q.defer();
	// 		var id = postid;
	// 		//var resp={};
	// 		$http.get('/details/getPostedAdTitle/'+id).success(deferred.resolve)
	// 		.error(deferred.resolve);
 //          			 return deferred.promise;

	// }
		

	}//eend return




}]);


	
		
	// getPostTitle:function(postid){

	// 		var id = postid;
	// 		//var resp={};
	// 		var req = $http.get('/details/getPostedAdTitle/'+id);
 //          			return req;
			

	// }