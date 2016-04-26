'use strict'
import angular from 'angular';

const HomeCtrl = angular.module('companyApp.HomeCtrl',[])
.controller('HomeCtrl',($window,$scope, $state, auth)=>{
   if(auth.isLoggedIn() === true){
      $scope.hello = "goodbye";
      $scope.name = auth.currentUser().username;
   }
   else{
      $scope.hello = "hello";
   }

});

export default HomeCtrl;
