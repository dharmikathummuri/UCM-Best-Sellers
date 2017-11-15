myApp.controller("catCtrl",['$scope','$http','$routeParams','$location','$route','accessFac','Auth',function($scope,$http,$routeParams,$location,$route,accessFac,Auth){

	console.log("hi");

		$scope.param1 = $routeParams.param;
   		 $scope.add=[];
   		 	$scope.auth = Auth.getUser();
	$scope.userId = $scope.auth.data.UserId;
   		
	$scope.getPosts = function(){
		console.log("params"+ $scope.param1);
		
		var data =$scope.param1;



		$http.get('/details/select',{params:{category:data}}).success(function(response){
			$scope.add = response;

			if($scope.add.length==0){


				// bootbox.alert("no Posts yet");

				$("#pagin").hide();

				// $location.path('/postAd');
				// bootbox.alert("Post an Add");
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