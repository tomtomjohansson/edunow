'use strict';
import angular from 'angular';

const UserpageCtrl = angular.module('companyApp.UserpageCtrl',[])
.controller('UserpageCtrl',($scope, $state, $stateParams,auth, search)=>{

   let forRequest = $stateParams.username;

   search.getUserpage(forRequest).success((response)=>{
      $scope.user = response.user;
      $scope.tags = response.tags;
      $scope.currentTag = $scope.tags[0];
      $scope.current = 0;
   });

   $scope.tagInfo = (tag)=>{
      $scope.currentTag = $scope.tags.find((x) => x._id == tag);
      $scope.current = $scope.tags.indexOf($scope.currentTag);
   };

});

export default UserpageCtrl;
