
myApp.controller("postDetailsCtrl",['$scope','$routeParams','$http','$location','accessFac','Auth','UserFactory','$route',function($scope,$routeParams,$http,$location,accessFac,Auth,UserFactory,$route){
	console.log("post details ctrl");


	$scope.auth = Auth.getUser();
	$scope.verify=false;
	 // $scope.disabled=false;
 	 // $scope.hideem= false;
 	
	$scope.userId = $scope.auth.data.UserId;
	$scope.result;
	$scope.singlePost=[];
	$scope.likes;
	$scope.pid;
	


     $scope.disable= function(id){
     	console.log("in disabled");
    		var data={

     				condition:"disabled",
     				uid:id
     			}

     	bootbox.confirm("Do you want to disable the post",function(ans){

     			if(ans==true){

     				 		  	$http.get('/posts/disabled',{params: data}).success(function(response){

					     		console.log(response);
				     		if(response.message=="updated"){

				     			bootbox.alert("This post is disabled for other users from now");
				     			$scope.verify =true;
				     			//$route.reload();

				     		}

				     	});
	
     			}
     			else{


     			}
    
     	});
   


     }    


     $scope.enable= function(id){
     	console.log("in enables");

     		 	var data={

     				condition:"enabled",
     				uid:id
     			}


     	bootbox.confirm("Do you want to enable the post",function(ans){

     			if(ans==true){

			     	$http.get('/posts/disabled',{params: data}).success(function(response){

			     		console.log(response);
			     			if(response.message=="updated"){

			     			bootbox.alert("This post is enabled for other users from now");

			     			$scope.verify =false;
			     			// $route.reload();


			     		}

			     	});
			     }

			     else{



			     }	

	
     	
     });  

 }


	$scope.getPostDetails = function(){
		var id = $routeParams.id;
			
		
			// console.log("in get post details");
			$http.get('/details/postDetails/'+id).success(function(response){
				$scope.singlePost = response;
				$scope.pid = $scope.singlePost[0].id;
			
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

