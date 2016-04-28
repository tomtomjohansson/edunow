'use strict'
const angular = require('angular');

const searchFactory = angular.module('companyApp.search', [])
.factory('search', ['$http', '$window', ($http, $window)=>{
   let search = {};

   search.allStudents = ()=>{
      return $http.get('/api/students');
   };

   search.allCompanies = ()=>{
      return $http.get('/api/companies');
   };

   search.addAsInteresting = (added,user)=>{
      let adding = {
         added:added,
         user:user
      };
      return $http.put('/api/interesting',adding);
   };

   search.getMyPage = (user)=>{
      return $http.post('/api/mypage',user);
   };


   return search;
}]);

export default searchFactory;
