myApp.controller("catCtrl",['$scope','$http','$routeParams','$location','$route','accessFac',function($scope,$http,$routeParams,$location,$route,accessFac){

	console.log("hi");

		$scope.param1 = $routeParams.param;
   		 $scope.add=[];
   		
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




}]);