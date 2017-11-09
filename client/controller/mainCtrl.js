myApp.controller('mainCtrl',['$scope','$location','Auth','accessFac',function($scope,$location,Auth,accessFac){

	$scope.getAccess = function(){
		accessFac.getPermission();  
		   //call the method in acccessFac to allow the user permission.
	}
		$scope.userName;
		$scope.id;
		if(Auth.isLoggedIn()){

			$scope.auth = Auth.getUser();
	

			$scope.userName = $scope.auth.data.first_name;	
			$scope.id = $scope.auth.data.UserId;	

			console.log("mainCtrl");

		}

		$scope.loggedIn = Auth.isLoggedIn();

		


}]);