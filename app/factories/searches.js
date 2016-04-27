'use strict'
const angular = require('angular');

const searchFactory = angular.module('companyApp.search', [])
.factory('search', ['$http', '$window', ($http, $window)=>{
   let search = {};

   search.allStudents = ()=>{
      return $http.get('/api/students');
   };

   search.addAsInteresting = (added,user)=>{
      var adding = {
         added:added,
         user:user
      };
      return $http.put('/api/interesting',adding);
   };


   return search;
}]);

export default searchFactory;
