myApp.directive('fileModel',['$parse',function($parse){

	return {

		restrict : 'A',
		link: function(scope,element,attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			element.bind('change',function(){
				scope.$apply(function(){

					modelSetter(scope,element[0].files[0]);

				})


			})

		}

	}


}]);
//second

// myApp.directive('fileModel', ['$parse', function ($parse) {
//     return {
//         restrict: 'A',
//         link: function (scope, element, attrs) {
//             var model = $parse(attrs.fileModel);
//             var isMultiple = attrs.multiple;
//             var modelSetter = model.assign;
//             element.bind('change', function () {
//                 var values = [];
//                 angular.forEach(element[0].files, function (item) {
//                     var value = {
//                        // File Name 
//                         name: item.name,
//                         //File Size 
//                         size: item.size,
//                         //File URL to view 
//                         url: URL.createObjectURL(item),
//                         // File Input Value 
//                         _file: item
//                     };
//                     values.push(value);
//                 });
//                 scope.$apply(function () {
//                     if (isMultiple) {
//                         modelSetter(scope, values);
//                     } else {
//                         modelSetter(scope, values[0]);
//                     }
//                 });
//             });
//         }
//     };
// }]);

//third


// myApp.directive('fileUpload', function () {
//     return {
//         scope: true,        //create a new scope
//         link: function (scope, el, attrs) {
//             el.bind('change', function (event) {
//                 var files = event.target.files;
//                 //iterate files since 'multiple' may be specified on the element
//                 for (var i = 0;i<files.length;i++) {
//                     //emit event upward
//                     scope.$emit("fileSelected", { file: files[i] });
//                 }                                       
//             });
//         }
//     };
// });