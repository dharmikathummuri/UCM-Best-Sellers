myApp.controller('replyUserCtrl',['$scope','$http','$location','Auth','$routeParams',function($scope,$http,$location,Auth,$routeParams){

		console.log("reply user"+$routeParams.id);

		$scope.uid = $routeParams.id;
		$scope.replyUserName;

		$scope.auth = Auth.getUser();
		$scope.sentFrom = $scope.auth.data.UserId;
		$scope.sentName= $scope.auth.data.first_name;
		$scope.getName = function(){

				$http.get('/details/getReplyUserName/'+$scope.uid).success(function(response){

					console.log(response.first_name);
					$scope.displayName = response.first_name+" "+response.last_name;
					$scope.replyUserName = response.first_name;

				});




		}

			$scope.onSubmit = function(){

			$scope.postDate=Date;
			$scope.postDate = new Date().toISOString().slice(0, 10);
			console.log($scope.sentToname+ "sentTo name");
			var data ={

				sendingToId :$scope.uid,
				sentFromId :$scope.sentFrom,
				MessageText : $scope.mess,
				subject :$scope.subject,
				senTdate :$scope.postDate,
				uname : $scope.sentName,
				sentTo :$scope.replyUserName,
				senderDeleted : "no",
				recieverDeleted:"no"


			};

			$http.get('/posts/sendMessage',{params :data}).success(function(data,status,headers){
				
						$scope.res =data;
						console.log($scope.res +" from server");
						console.log(status);
						console.log(headers);
						if(status==200){
								bootbox.alert("sent your message to " +$scope.replyUserName);
								$location.path('/home');

						}
						else{

							bootbox.alert("Please try again " +$scope.replyUserName);
							$route.reload();
						}

				
			

				});


	}


}]);