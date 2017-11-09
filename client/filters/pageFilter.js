
myApp.filter("pageFilter",function(){

	return function(data,start){
	
			start= 0+start;
			return data.slice(start);

	
		
	}

});