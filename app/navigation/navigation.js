'use strict'
import angular from 'angular';

const navCtrl = angular.module('companyApp.navCtrl',[])
.controller('navCtrl',($window,$scope,auth)=>{
   // if(auth.currentUser()){
   //    $scope.noUser = false;
   // }
   // else{
   //    $scope.noUser = true;
   // }

   $scope.noUser = !auth.currentUser();
});

export default navCtrl;
