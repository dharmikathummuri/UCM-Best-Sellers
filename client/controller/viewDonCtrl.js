myApp.controller("viewDonCtrl",['$scope','$http','$location','accessFac',function($scope,$http,$location,accessFac){
	
	 $scope.add=[];﻿
	$scope.pageSize = 3;
	$scope.currentPage = 1;
	console.log("in viewAdCtrl");
	$scope.getPosts = function(){
		console.log("in donations");

   //  	$(document).ready(function(){

			// 	$("#myCarousel").carousel();
			// });

		$http.get('/posts/postedDonations').success(function(response){
			$scope.add = response;
			
			if($scope.add.length==0){

				// bootbox.alert("no Posts yet");

				$("#pagin").hide();
				// $location.path('#viewDonations');
			}
			else{

				// $location.path('#viewDonations');	
				console.log("else");
			}
			console.log($scope.add);

		});
	}

$scope.getAccess = function(){
		accessFac.getPermission();       //call the method in acccessFac to allow the user permission.
	}


}]);