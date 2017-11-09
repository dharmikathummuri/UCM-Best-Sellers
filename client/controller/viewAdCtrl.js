myApp.controller("viewAdCtrl",['$scope','$http','$location','accessFac',function($scope,$http,$location,accessFac){
	
	 $scope.add=[];﻿
	$scope.pageSize = 3;
	$scope.currentPage = 1;
	console.log("in viewAdCtrl");
	$scope.getPosts = function(){
		// console.log("in get posts");

		$http.get('/posts/postedAds').success(function(response){
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
	  $scope.getAccess = function(){
	        accessFac.getPermission();     
	    }




}]);