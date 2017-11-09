
myApp.controller("postDetailsCtrl",['$scope','$routeParams','$http','$location','accessFac','Auth','UserFactory',function($scope,$routeParams,$http,$location,accessFac,Auth,UserFactory){

	console.log("post details ctrl");


	$scope.auth = Auth.getUser();
	 // $scope.disabled=false;
 	 // $scope.hideem= false;
 	
	$scope.userId = $scope.auth.data.UserId;
	$scope.result;
	$scope.singlePost=[];
	$scope.likes;
	

            // $scope.save = function () {
            //     console.log('Data Saved.');
            //     $scope.isDisabled = true;
            // };

	$scope.getPostDetails = function(){
		var id = $routeParams.id;
			
		
			// console.log("in get post details");
			$http.get('/details/postDetails/'+id).success(function(response){
				$scope.singlePost = response;
			
				console.log("post details user id= 2 "+ $scope.singlePost[0].UserId==$scope.userId);
				$scope.result = angular.equals($scope.userId, $scope.singlePost[0].UserId);
				

			});
		


		

		};

		$scope.getLikes = function(){

			var id = $routeParams.id;

			var data ={
						 userId : parseInt($scope.userId),
						 postId :parseInt(id)

					};
					console.log(data);


			$http.get('/details/getLikes',{params :data}).success(function(data,status,headers){

					$scope.res =data;
					console.log($scope.res.likes);
					$scope.likes= $scope.res.likes;
					$scope.thisUserLike = $scope.res.userLikes;

					if($scope.thisUserLike===1){

						$scope.condition = true;
						$scope.textLike = "You liked this post";

					}
					else{


						$scope.condition = false;
					}


					//console.log($scope.res.data.likes);


					//console.log($scope.res.likesData.userLikes);
					//console.log($scope.res.likesData.userLikes+" getlike use likes");
					// console.log(response.likesData.allLikes+"likes data");
					// console.log(response.likesData.thisUserLike+"likes data");

					// var likes = response[0].userLikes;
					// console.log("likes" +likes);
					// $scope.likes = likes;


			});

		}





		$scope.removePost = function(id){

			bootbox.confirm("Are you sure you want to delete this post",function(answer){

				if(answer==true)
				{
					$http.delete('/details/removePost/'+id).success(function(response){
						console.log(response);
						bootbox.alert("post deleted");
						$location.path('/viewAd');

					});



				}
				else{

					// $route.reload();


				}




			})

		}//end remove



		$scope.clickLike = function(id){
	

				//console.log(JSON.stringify(data)+"data in clik");
				$http.post('/details/likes',{params : { userId : parseInt($scope.userId),
						 postId :parseInt(id),
						  like:true}}).success(function(response){
							// $scope.resp ={};
							// $scope.resp = response;
							console.log(response.message);
							var nol = parseInt(response.data);

							if(response.message=="success"){

									$scope.likes= nol;
									
									
									
							}
							if(response.message=="error"){
								
								bootbox.alert("you already liked the post");

							}
							

						
					});

				
		}


		$scope.getUserId = function(postId){

					var id = postId;
					console.log("id in get user id postctrl" +id);
					// $location.path('/messageUser/'+id);


			UserFactory.getUserId(id).then(function(response){


				 		console.log(response[0].UserId);
          				var mesId = response[0].UserId;
          				$location.path('/messageUser/'+mesId);

			});

	

					//console.log($scope.mesId);
					//$location.path('/messageUser/'+$scope.mesId);
					// $http.get('/details/getPostedUserId/'+id).success(function(response){
     
    		 //      				 });



		};

		$scope.getAccess = function(){

			accessFac.getPermission();      
		
		}



	}]);

