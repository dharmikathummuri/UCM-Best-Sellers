// console.log("hii ");

var myApp = angular.module('myApp',['jcs-autoValidate','ui.bootstrap','ngRoute','ngCookies','ngStorage','ngAnimate']);


myApp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

 
	$routeProvider.when('/home',{
      controller:'mainCtrl',
      templateUrl: 'views/home.html',
      resolve:{
        "check": function($q){

            
            var defer= $q.defer();
            defer.resolve();
            return defer.promise;
    

        }

      }
  
      
  }).when('/postAd',{
      controller:'postAdCtrl',
      templateUrl: 'views/postAdd.html',
      resolve:{
        "check":function(accessFac,$location,$route,$q){   //function to be resolved, accessFac and $location Injected
           var defer = $q.defer();
            if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                   // $location.path('/postAd');
                    defer.resolve();
              
            }else{
              
                defer.reject();  
              
                $location.path('/login');                //redirect user to home if it does not have permission.
                bootbox.alert("please Login/register to access this page");
            }
             return defer.promise;
        }
      }
  }).when('/viewAd',{
      controller:'viewAdCtrl',
      templateUrl: 'views/viewAd.html',
       resolve:{
        "check":function(accessFac,$location,$route,$q){   //function to be resolved, accessFac and $location Injected
            var defer = $q.defer();
            if(accessFac.checkPermission()){  
              //check if the user has permission -- This happens before the page loads
             
              console.log("hi check");
              defer.resolve();
         
               
                   
            }else{
               
                defer.reject();  
             
                 $location.path('/login');

                bootbox.alert("please Login/register to access this page");
            }
             
                return defer.promise;
        }
      }
      
  }).when('/login',{
      controller:'loginCtrl',
      templateUrl: 'views/login.html'
       
  }).when('/nav',{
      controller:'navCtrl',
      templateUrl: 'views/home.html'
      //neew code
  }).when('/register',{
      controller:'registerCtrl',
      templateUrl: 'views/register.html'
    
  }).when('/AdDetails/:id',{

      controller:'postDetailsCtrl',
      templateUrl:'views/postDetails.html',
        resolve:{
        "check":function(accessFac,$location,$route,$routeParams,$q){   //function to be resolved, accessFac and $location Injected
            var defer = $q.defer();
            if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                  
                         defer.resolve();
                 
                        console.log("rotes"+$route.current.params.id)

                        var id= $route.current.params.id;
                  
                   
                   // $location.path('/AdDetails/:id');
                   
            }else{
                defer.reject();
            
                $location.path('/login');                //redirect user to login if it does not have permission.
                bootbox.alert("please Login/register to access this page");
            }
             return defer.promise;
        }
      }
     
  }).when('/viewDonations',{

      
      templateUrl:'views/viewDonations.html',
        resolve:{
        "check":function(accessFac,$location,$route,$q){   //function to be resolved, accessFac and $location Injected
           
           var defer = $q.defer();
            if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                  
                  defer.resolve();

                   // $location.path('/viewDonations');
                   
            }else{
                
                defer.reject();
               
                $location.path('/login');                //redirect user to home if it does not have permission.
                bootbox.alert("please Login/register to access this page");
            }
            return defer.promise;
        }
      },
      controller:'viewDonCtrl'
      
  }).when('/updatePost/:id',{

      controller:'updateDetailsCtrl',
      templateUrl:'views/updatePost.html',
        resolve:{
        "check":function(accessFac,$location,$route,$routeParams,$q){   //function to be resolved, accessFac and $location Injected
            var defer = $q.defer();
            if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                   
                        defer.resolve();

                       
                      
                        console.log("rotes"+$route.current.params.id)

                        var id= $route.current.params.id;
                  
                    // $location.path('/updatePost/:id');
                   
            }else{
              defer.reject();
             
                $location.path('/login');                //redirect user to home if it does not have permission.
                bootbox.alert("please Login/register to access this page");
            }
            return defer.promise;
        }
      }
    
  }).when('/category',{

      controller:'catCtrl',
      templateUrl:'views/category.html',
        resolve:{
        "check":function(accessFac,$location,$route,$q){   //function to be resolved, accessFac and $location Injected
           var defer = $q.defer();
            if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                   // $location.path('/category');
                   defer.resolve();
                 
                   var param= $route.current.params;
                   
            }else{
               
                $location.path('/login');    
                defer.reject(); 
                          
                bootbox.alert("please Login/register to access this page");
            }
            return defer.promise;
        }
      }
   
  }).when('/viewUserPosts/:id',{
    controller:'viewPostsCtrl',
    templateUrl:'views/viewUserPosts.html',
      resolve:{
        "check":function(accessFac,$location,$route,$q){   //function to be resolved, accessFac and $location Injected
           var defer = $q.defer();
            if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                   // $location.path('/category');
                   defer.resolve();
                 
                 var id= $route.current.params.id;
                   
            }else{
               
                $location.path('/login');    
                defer.reject(); 
                          
                bootbox.alert("please Login/register to access this page");
            }
            return defer.promise;
        }
      }



  }).when('/updateProfile/:id',{
    controller:'updateProfileCtrl',
    templateUrl:'views/updateProfile.html',
      resolve:{
        "check":function(accessFac,$location,$route,$q){   //function to be resolved, accessFac and $location Injected
           var defer = $q.defer();
            if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                   // $location.path('/category');
                   defer.resolve();
                 
                 var id= $route.current.params.id;
                   
            }else{
               
                $location.path('/login');    
                defer.reject(); 
                          
                bootbox.alert("please Login/register to access this page");
            }
            return defer.promise;
        }
      }



  }).when('/postsliked',{
    controller:'postLikedCtrl',
    templateUrl:'views/postliked.html',
      resolve:{
        "check":function(accessFac,$location,$route,$q){   //function to be resolved, accessFac and $location Injected
           var defer = $q.defer();
            if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                   // $location.path('/category');
                   defer.resolve();
                 
                 var id= $route.current.params.id;
                   
            }else{
               
                $location.path('/login');    
                defer.reject(); 
                          
                bootbox.alert("please Login/register to access this page");
            }
            return defer.promise;
        }
      }



  }).when('/messageUser/:id',{
    controller:'messageUserCtrl',
    templateUrl:'views/messageUser.html',
      resolve:{
        "check":function(accessFac,$location,$route,$q){   //function to be resolved, accessFac and $location Injected
           var defer = $q.defer();
            if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                   // $location.path('/category');
                   defer.resolve();
                 
                 //var id= $route.current.params.id;
                   
            }else{
               
                $location.path('/login');    
                defer.reject(); 
                          
                bootbox.alert("please Login/register to access this page");
            }
            return defer.promise;
        }
      }



  }).when('/yourMessages',{

    controller:'yourMessagesCtrl',
    templateUrl:'views/YourMessages.html',
      resolve:{
        "check":function(accessFac,$location,$route,$q){   //function to be resolved, accessFac and $location Injected
           var defer = $q.defer();
            if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                   // $location.path('/category');
                   defer.resolve();
                 
                 //var id= $route.current.params.id;
                   
            }else{
               
                $location.path('/login');    
                defer.reject(); 
                          
                bootbox.alert("please Login/register to access this page");
            }
            return defer.promise;
        }
      }





  }).when('/sentMessages',{

    controller:'sentMessagesCtrl',
    templateUrl:'views/sentMessages.html',
      resolve:{
        "check":function(accessFac,$location,$route,$q){   //function to be resolved, accessFac and $location Injected
           var defer = $q.defer();
            if(accessFac.checkPermission()){    //check if the user has permission -- This happens before the page loads
                   // $location.path('/category');
                   defer.resolve();
                 
                 //var id= $route.current.params.id;
                   
            }else{
               
                $location.path('/login');    
                defer.reject(); 
                          
                bootbox.alert("please Login/register to access this page");
            }
            return defer.promise;
        }
      }





  }).otherwise({
      redirectTo: '/home'
  });



}]);	
//end controller




