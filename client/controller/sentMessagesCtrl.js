myApp.controller('sentMessagesCtrl',['$scope','$http','Auth','$location','$route','$window',function($scope,$http,Auth,$location,$route,$window){

	console.log("in sent messages");
	$scope.set=[];
	$scope.pageSize =10
	$scope.currentPage = 1;
	$scope.mesId;
	$scope.getMessages = function(){


		$scope.auth = Auth.getUser();
		$scope.userId = $scope.auth.data.UserId;
		$scope.name = $scope.auth.data.first_name;

					var data={

							condition: "sent",
							uid:$scope.userId
						};
		$http.get('/details/getMessages',{params : data}).success(function(response){

			console.log(response);
			$scope.set = response;
			//console.log(response.message_id)
			$scope.mesId= response.message_id;
					if($scope.set.length==0){


						$("#pagin").hide();

					
					}
					else{

						
						console.log("else");
					}


		});




	}

	$scope.deleteMessage = function(index){

			console.log(index);
			bootbox.confirm("you want to delete this message?",function(ans){

				if(ans==true){

						var data={

							condition: "sent",
							uid : index

						};

						$http.delete('/details/deleteMessage',{params : data}).success(function(response){


									console.log(response);
									if(response.status==true){

										$route.reload();
										
										bootbox.alert("message deleted");
										 
									}


						});


				}
				else{



				}



			})
			


	};





}]);