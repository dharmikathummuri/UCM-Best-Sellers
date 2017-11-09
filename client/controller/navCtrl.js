
// myApp.controller("navCtrl",['$scope','$location',function($scope,$location){



// }]);


myApp.controller('navCtrl', ['$scope', '$location','$http','$routeParams','$rootScope','accessFac','Auth','$route',function ($scope,$location,$http,$routeParams,$rootScope,accessFac,Auth,$route) {

	console.log("navcrel");

	$scope.category = function() {
		
		var cat = $scope.selected;

		switch (cat) {
			case 'cars':

			$location.url('/category').search({param: 'cars'});
			break;

			case 'Furniture':

			$location.url('/category').search({param: 'Furniture'});
			break;

			case 'electronics':

			$location.url('/category').search({param: 'electronics'});
			break;
			case 'Phones':

			$location.url('/category').search({param: 'Phones'});
			break;
			case 'Fashion':

			$location.url('/category').search({param: 'Fashion'});
			break;

			case 'Accomodations':

			$location.url('/category').search({param: 'Accomodations'});
			break;



			default:
			$location.url('/');
		}

	}
	$scope.getAccess = function(){
		accessFac.getPermission();  
		   //call the method in acccessFac to allow the user permission.
	}

	$scope.logout = function(){
		bootbox.confirm("Are you sure you want to logout???",function(ans){
			if(ans==true){

						Auth.logout();
						$location.path("/login");
						$route.reload();
						accessFac.getPermission(); 
								 
						bootbox.alert("Logged out successfuly");
						
									 	
						
            

			}
			else{

				
			}

			
			});

	}

	// $scope.loggedIn = Auth.isLoggedIn();

	$scope.getUser = function(){

				$scope.user;
			if(Auth.isLoggedIn())
			{
				$scope.loggedIn=true;
				$scope.user = Auth.getUser();
				console.log("username" +$scope.user);
				$route.reload();
				
			}

			else{

				$route.reload();
				$scope.loggedIn=false;
			}
			return $scope.user;


	}
		
			


	


	

			
	






}]);



