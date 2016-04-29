'use strict'
import angular from 'angular';

const UserpageCtrl = angular.module('companyApp.UserpageCtrl',[])
.controller('UserpageCtrl',($scope, $state, $stateParams,auth, search)=>{

   $scope.forRequest = $stateParams.username;

   search.getUserpage($scope.forRequest).success((response)=>{
      $scope.user = response.user;
   });

});

export default UserpageCtrl;
