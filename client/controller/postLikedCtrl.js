myApp.controller("postLikedCtrl",['$scope','$routeParams','$http','$location','accessFac','Auth',function($scope,$routeParams,$http,$location,accessFac,Auth){

		console.log("hi from post liked");
			 $scope.add=[];﻿
			$scope.pageSize = 3;
			$scope.currentPage = 1;
			$scope.auth = Auth.getUser();
	
 	$scope.name = $scope.auth.data.first_name+" "+$scope.auth.data.last_name;
	$scope.userId = $scope.auth.data.UserId;
	console.log("uid in getlikesd posts"+$scope.userId);
		$scope.getPosts = function(){
		// console.log("in get liked posts");

		$http.get('/posts/likedPosts',{params :{userId: $scope.userId}}).success(function(response){
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