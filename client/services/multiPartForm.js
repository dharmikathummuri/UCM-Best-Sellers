myApp.service('multiPartForm',['$http','$routeParams',function($http,$routeParams){

	this.post = function(uploadURL,data){
		console.log("inside multipart");
		var fd = new FormData();
		for(var key in data){

			fd.append(key,data[key]);

		}
		
			$http.put(uploadURL,fd,{
				transformRequest :angular.identity,
				headers: {'Content-Type': undefined}
				
			});	
		};

		
	

}]);

