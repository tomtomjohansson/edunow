'use strict'
const angular = require('angular');

const authFactory = angular.module('companyApp.auth', [])
.factory('auth', ['$http', '$window', ($http, $window)=>{
   let auth = {};

   auth.saveToken = (data)=>{
      $window.localStorage['user-token'] = data.token;
      $window.localStorage.user = JSON.stringify(data.user);
   };

   auth.getToken = ()=>{
      return $window.localStorage['user-token'];
   };


   auth.isLoggedIn = ()=>{
      let token = auth.getToken();
      if(token){
         // let payload = JSON.parse($window.atob(token.split('.')[1]));
         // return payload.exp > Date.now() / 1000;
         return true;
      }
      else{
         return false;
      }
   };

   auth.currentUser = ()=>{
      if(auth.isLoggedIn()){
         let isUser = JSON.parse($window.localStorage.user);
         return isUser;
      }
   };

   auth.register = (user)=>{
      return $http.post('/api/register', user).success((data)=>{
         auth.saveToken(data);
      });
   };

   auth.logIn = (user)=>{
      return $http.post('/api/login', user).success((data)=>{
         auth.saveToken(data);
      });
   };

   auth.logOut = ()=>{
      console.log('Logga ut då för fan')
      $window.localStorage.removeItem('user-token');
      $window.localStorage.removeItem('user');
   };

   return auth;
}]);

export default authFactory;
