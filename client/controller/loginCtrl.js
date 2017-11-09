

myApp.controller('loginCtrl', ['$scope','$http','$location','Auth','accessFac',function($scope,$http,$location,Auth,accessFac) {
	//submit
	$scope.loginFormModel={};





	$scope.onSubmit = function(){




		var data = $scope.loginFormModel;
		var fd = new FormData();
		for(var key in data){

			fd.append(key,data[key]);

		}
		var url = '/users/login';
		$http.post(url,fd,{
			transformRequest :angular.identity,
			headers: {'Content-Type': undefined}

		}).
		success(function(data,status,headers) {
		
		console.log(data.status);
		if(data.status==true){
				$scope.resp ={};
				$scope.resp = data;
			console.log($scope.resp.data.first_name);
			console.log($scope.resp.data.UserId);
			Auth.setUser($scope.resp);
			$location.path("/home");
			$scope.user = Auth.getUser();

			// Auth.set("user",$scope.resp);

			//  $scope.user = Auth.get("user");
			// //console.log("auth user"+$scope.user.data.UserId);
			// console.log("auth user"+$scope.user.UserId);
			

		}
		if(data.status==false){

			bootbox.alert("inavlid login credentials please try again");

			
		}


			

		}).error(function (data, status, headers) {

			console.log("error");
			return data;

		});

		// $scope.user={};
		
		

	

	}

	$scope.getAccess = function(){
		accessFac.getPermission();     
	};


}]);



