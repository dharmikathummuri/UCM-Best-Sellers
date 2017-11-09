
myApp.controller("updateDetailsCtrl",['$scope','$routeParams','$http','multiPartForm','$location','accessFac','Auth',function($scope,$routeParams,$http,multiPartForm,$location,accessFac,Auth){

    console.log("update details ctrl");
    $scope.singlePost={};
    // $scope.userId = $scope.auth.data.UserId;
    // $scope.postAdModel.userId = $scope.userId;

    $scope.getPostDetails = function(){
        var id = $routeParams.id;
        console.log("in get post details "+ $scope.singlePost.posted_date);
        $http.get('/details/postDetails/'+id).success(function(response){
            $scope.singlePost = response;
            console.log("user id" +$scope.singlePost[0].UserId);
            $scope.singlePost[0].posted_date = new Date().toISOString().slice(0, 10);
            $scope.singlePost[0].userId = $scope.singlePost[0].UserId;
             $scope.singlePost[0].images;
          
        });
    }
    // $scope.postAdModel = {};
    //$scope.postDate=Date;

    
    $scope.onSubmit = function(){

        var imgVal1 = $('#image1').val();
        if(imgVal1=='')
        {
            bootbox.alert("Please Choose Atleast one File");

        }else{

            var id= $routeParams.id;
            var uploadUrl = "/details/update/"+id;
            console.log(uploadUrl);
            multiPartForm.post(uploadUrl,$scope.singlePost[0]);
            console.log($scope.singlePost);

            $location.path('#viewAd');

        }


        
    };


    $scope.getAccess = function(){
        accessFac.getPermission();     
    }
}]);

