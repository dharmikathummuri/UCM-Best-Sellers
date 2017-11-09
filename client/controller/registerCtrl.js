
myApp.run(function(defaultErrorMessageResolver){
	defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages){

		errorMessages['badUserName'] ='User name must contain only number and letters';
		errorMessages['tooYoung'] ='User name must contain only number and letters';
	});


});


myApp.controller("registerCtrl",['$scope','$http','$location',function($scope,$http,$location){

	console.log("in registerCtrl");
	$scope.regFormModel={};
	// console.log($scope.regFormModel);
	$scope.onSubmit = function(){

		var data = $scope.regFormModel;
		var fd = new FormData();
		for(var key in data){

			fd.append(key,data[key]);

		}

		$http.post('/users/register',fd,	{
			transformRequest :angular.identity,
			headers: {'Content-Type': undefined}

		})
		.success(function (data, status, headers) {
			$scope.PostDataResponse = data.message;
			$scope.red = data.redirect;
			console.log($scope.red);
			console.log($scope.PostDataResponse);
			if( $scope.PostDataResponse ==="user registered sucessfully")
			{
				bootbox.alert("Thank you for registering with UCM Best Sellers, You may now Login");
				$location.path($scope.red);

			}
			if($scope.PostDataResponse ==="email id already exists"){

				bootbox.alert("email id already exists,Please try with another email-id");
				$scope.regFormModel.email=""; 
               			//$location.path('register');


               }
            


               	}).error(function (data, status, header) {

			$scope.message = data.message;
			console.log($scope.message);




		});
		

	}

}]);