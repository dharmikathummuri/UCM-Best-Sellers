myApp.service('multiPartFormPost',['$http','$routeParams',function($http,$routeParams){

	this.post = function(uploadURL,data){
		console.log("inside multipart");
		// var cond=true;
		var fd = new FormData();
		for(var key in data){

			fd.append(key,data[key]);

		}

		// for (var i = 0; i < uploadFiles.length; i++) {
  //                   //add each file to the form data and iteratively name them
  //                   fd.append("file" + i, uploadFiles[i]);
  //               }

                // fd.append("data", angular.toJson(data));

                $http.post(uploadURL,fd,{
                	transformRequest :angular.identity,
                	headers: {'Content-Type': undefined}

                }).then(function (response) {
                    //success
                  }, function (response) {
                  // this function handles error

                   bootbox.alert("something went wrong while uploading data,Please try again" +response);
                  });


              };







            }]);

