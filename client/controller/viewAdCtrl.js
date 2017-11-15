myApp.controller("viewAdCtrl",['$scope','$http','$location','accessFac','Auth',function($scope,$http,$location,accessFac,Auth){
	
	 $scope.add=[];﻿
	$scope.pageSize = 3;
	$scope.currentPage = 1;


	$scope.auth = Auth.getUser();
	$scope.userId = $scope.auth.data.UserId;


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

	

	    $scope.handleClick = function(id){

	    			console.log(id+"in handle click");
	    			$location.path('/AdDetails/'+id);

	    }


}]);