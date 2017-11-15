
myApp.run(function(defaultErrorMessageResolver){
	defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages){

		errorMessages['badUserName'] ='User name must contain only number and letters';
		errorMessages['tooYoung'] ='User name must contain only number and letters';
	});


});

myApp.controller("postAdCtrl",['$scope','multiPartFormPost','$filter','$location','$http','accessFac','Auth',function($scope,multiPartFormPost,$filter,$location,$http,accessFac,Auth){


	console.log("in postAdCtrl");
	$scope.postAdModel = {};
	$scope.postDate=Date;
	$scope.postDate = new Date().toISOString().slice(0, 10);
	$scope.postAdModel.postDate = $scope.postDate;
	$scope.userId;

	$scope.auth = Auth.getUser();
	console.log("auth user " +$scope.auth);
	

	$scope.userId = $scope.auth.data.UserId;
	$scope.postAdModel.userId = $scope.userId;
	$scope.postAdModel.yourName = $scope.auth.data.first_name +" "+ $scope.auth.data.last_name;
	$scope.postAdModel.contact =  $scope.auth.data.contact_no;
	$scope.postAdModel.disabled= "no";	
	$scope.postAdModel.optradio = $scope.optradio;
	 $scope.postAdModel.myFile = []; 

		$scope.onSubmit = function(){

			var imgVal1 = $('#image1').val();
			
			if(imgVal1=='')
			{
				bootbox.alert("Please Choose Atleast one File");

			}
			else{
				

				console.log("files" +$scope.postAdModel.myFile);
				console.log($scope.postAdModel);
				var uploadUrl = '/posts/upload';

				multiPartFormPost.post(uploadUrl,$scope.postAdModel);

				if($scope.postAdModel.optradio=="Sell"){

					bootbox.alert("Successfully posted your ad for Selling");

					$location.path("/viewAd");
				
				}
				if($scope.postAdModel.optradio=="Donate"){
					bootbox.alert("Successfully posted your ad for Donations");
					$location.path("/viewDonations");
				
				}
				



			}
			return false;




		};

		$scope.getAccess = function(){
			accessFac.getPermission();       //call the method in acccessFac to allow the user permission.
		}

	}]);

