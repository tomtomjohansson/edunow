'use strict'
import angular from 'angular';

const myCtrl = angular.module('companyApp.myCtrl',[])
.controller('myCtrl',($scope, $state, $window ,auth, search)=>{
   if(auth.currentUser()){
      $scope.user = auth.currentUser();
   }
   if($scope.user){
      search.getMyPage($scope.user).success((response)=>{
         $scope.theUser = response.theUser;
         $scope.interests = response.interests;
      });
   }

});

export default myCtrl;
