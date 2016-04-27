'use strict'
const angular = require('angular');

const searchFactory = angular.module('companyApp.search', [])
.factory('search', ['$http', '$window', ($http, $window)=>{
   let search = {};

   search.saveToken = (data)=>{
      $window.localStorage['user-token'] = data.token;
      $window.localStorage.user = JSON.stringify(data.user);
   };

   search.register = (user)=>{
      return $http.post('/api/user/register', user).success((data)=>{
         search.saveToken(data);
      });
   };

   search.logIn = (user)=>{
      return $http.post('/api/user/login', user).success((data)=>{
         search.saveToken(data);
      });
   };


   return search;
}]);

export default searchFactory;
