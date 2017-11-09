myApp.factory('accessFac',['Auth',function(Auth){
    var obj = {}
    this.access = false;
    obj.getPermission = function(){    //set the permission to true
       
        if(Auth.isLoggedIn()){

        	 this.access = true;
        }
         else
         {
            this.access=false;

         }

        
       return this.access;
    }
    obj.checkPermission = function(){
        return this.access;             //returns the users permission level 
    }
    return obj;
    
}]);