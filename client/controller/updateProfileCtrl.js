myApp.controller("updateProfileCtrl",["$scope","$http","$location","$routeParams",function($scope,$http,$location,$routeParams){

	console.log("update profile ctrl");
	$scope.profile={};
 $scope.getProfileDetails = function(){
        
        var id = $routeParams.id;
        // console.log("in get post details "+ $scope.singlePost.posted_date);
        $http.get('/details/profile/'+id).success(function(response){
            $scope.profile = response;

    
      
        });
    }


     $scope.onSubmit = function(){


            var id= $routeParams.id;
            console.log("id in submit" +id)
            var uploadUrl = '/details/updateProfile/'+id;
           	console.log($scope.profile[0]);
           	$http.put(uploadUrl,$scope.profile[0]).success(function(response){

           			if(response.status==true){

           				bootbox.alert("Your profile has been successfully updated");
           				$location.path('/home');

           			}
           			else{

           				bootbox.alert("there are some erros,Please try again");
           				

           			}



           	});
         




        
    };




}]);