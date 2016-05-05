'use strict';
import angular from 'angular';

const HomeCtrl = angular.module('companyApp.HomeCtrl',[])
.controller('HomeCtrl',($window,$scope, $state, auth,search)=>{

   // Http-request in search-factory. Returns object with aggregation.
   search.getHomePage().success((response)=>{
      $scope.info = response.object[0];
   });

});

export default HomeCtrl;
