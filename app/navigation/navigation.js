'use strict'
import angular from 'angular';

const navCtrl = angular.module('companyApp.navCtrl',[])
.controller('navCtrl',($window,$scope,auth)=>{
   $scope.isLoggedIn = auth.isLoggedIn();
});

export default navCtrl;
