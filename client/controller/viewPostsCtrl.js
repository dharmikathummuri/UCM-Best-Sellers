myApp.controller("viewPostsCtrl",['$scope','$http','$location','accessFac','$routeParams','Auth',function($scope,$http,$location,accessFac,$routeParams,Auth){
	
	 $scope.add=[];﻿
	$scope.pageSize = 3;
	$scope.currentPage = 1;
	console.log("in viewPostsCtrl");

	$scope.auth = Auth.getUser();
	console.log("auth user " +$scope.auth);
	

	$scope.userId = $scope.auth.data.UserId;
	$scope.uname = $scope.auth.data.first_name;
	// var id= $scope.userId;

		  $scope.getAccess = function(){
	        accessFac.getPermission();     
	  	 }


	$scope.getPosts = function(){
		$scope.getAccess();
		var id = $scope.userId;

		$http.get('/details/posts/'+id).success(function(response){
			console.log("response from details "+response);
			
				$scope.add = response;
			
			if($scope.add.length==0){


				$("#pagin").hide();

				
			}
			else{

				
				console.log("else");
			}
			//console.log($scope.add);

		});
	}
	  





}]);