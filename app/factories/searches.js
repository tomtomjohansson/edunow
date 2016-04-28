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
      let interest = {
         interesting:added,
         user:user,
         change: 'Add'
      };
      return $http.put('/api/interesting',interest);
   };

   search.removeInterest = (removed,user)=>{
      let interest = {
         interesting:removed,
         user:user,
         change: 'Remove'
      };
      return $http.put('/api/interesting',interest);
   };

   search.getMyPage = (user)=>{
      return $http.post('/api/mypage',user);
   };




   return search;
}]);

export default searchFactory;
