 myApp.factory('Auth',['$cookies','$window',function($cookies,$window){
  var user={};
   // var user = $cookies.getObject("userCookie") || null;

return{
  setUser : function(aUser){


    user = aUser;
    // console.log("userId " + user.data.first_name);

    // var expireDate = new Date(); 
    // expireDate.setDate(expireDate.getDate() + 1); 
    $cookies.put("userCookie",user);
    
    
  },
  isLoggedIn : function(){
    //return(user)? user : false;
    var status = $cookies.get("userCookie");
    if(user){

      return true;
    }

     return false;  
  },
  logout: function(){
  

        user=""
        // delete user;
        console.log("logout");
        $cookies.remove("userCookie");
        
        return true;
        


    


  },//end logout

  getUser: function(){

    return user;


  }


  }//return
}]);