'use strict'
import angular from 'angular';

const myCtrl = angular.module('companyApp.myCtrl',[])
.controller('myCtrl',($scope, $state, $window ,auth)=>{
   $scope.user = auth.currentUser();

});

export default myCtrl;
