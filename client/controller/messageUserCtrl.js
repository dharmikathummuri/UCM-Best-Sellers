myApp.controller("messageUserCtrl",['$scope','$http','$routeParams','Auth','accessFac','UserFactory','$q','$route','$location',function($scope,$http,$routeParams,Auth,accessFAc,UserFactory,$q,$route,$location){

	console.log("in message ctrl");
	var pid = $routeParams.id;
	$scope.SendToId= pid;
	$scope.auth = Auth.getUser();
	$scope.sentFrom = $scope.auth.data.UserId;
	$scope.sentName= $scope.auth.data.first_name;
	$scope.sentToname;
	$scope.getName = function(){
		
				UserFactory.getUserName(pid).then(function(resp){
					console.log(resp);
					$scope.res = resp;
					$scope.userName = $scope.res.firstName +" "+$scope.res.lastName;	
					$scope.sentToname =  $scope.res.firstName

					}).catch(function(data, status) {
				    console.error('Gists error', resp.status, resp.data);
				  	})
				  	.finally(function() {
				    console.log("finally finished gists");
				 	 });
	}

	// $scope.getTitle = function(){


	// 		UserFactory.getPostTitle(pid).then(function(resp){
	// 		console.log(resp);
	// 		$scope.res = resp;
	// 		console.log("get subject"+$scope.res);
	// 			$scope.signature = "Regarding: ";
	// 			$scope.subject = $scope.signature+$scope.res;	
			

	// 		}).catch(function(data, status) {
	// 			    console.error('Gists error', resp.status, resp.data);
	// 		})
	// 			  	.finally(function() {
	// 			    console.log("finally finished gists");
	// 		 });



	// }


	// $scope.getName = function(){


		
	// 		$q.all([
	// 	    	UserFactory.getPostTitle(pid),
	// 	    	UserFactory.getUserName(pid)
	// 	    ]).then(function(results) {
	// 	       /* enter your logic here */
	// 	       console.log(results[0]);
	// 	       console.log(results[1].firstName);
	// 	        console.log(results[1].lastName);
	// 	        $scope.signature = "Regarding: ";
	// 	        $scope.title = results[0];
	// 	        $scope.subject =   $scope.signature +  $scope.title;
	// 	        $scope.res = results[1];
	// 	        $scope.userName = $scope.res.firstName +" "+$scope.res.lastName;	

	// 	    });

	// }

	$scope.onSubmit = function(){

			$scope.postDate=Date;
			$scope.postDate = new Date().toISOString().slice(0, 10);
			console.log($scope.sentToname+ "sentTo name");
			var data ={

				sendingToId : $scope.SendToId,
				sentFromId :$scope.sentFrom,
				MessageText : $scope.mess,
				subject :$scope.subject,
				senTdate :$scope.postDate,
				uname : $scope.sentName,
				sentTo : $scope.sentToname,
				senderDeleted : "no",
				recieverDeleted:"no"


			};

			$http.get('/posts/sendMessage',{params :data}).success(function(data,status,headers){
				
						$scope.res =data;
						console.log($scope.res +" from server");
						console.log(status);
						console.log(headers);
						if(status==200){
								bootbox.alert("sent your message to " +$scope.userName);
								$location.path('/home');

						}
						else{

							bootbox.alert("Please try again " +$scope.userName);
							$route.reload();
						}

				
			

				});


	}


	


}]);