'use strict'
import angular from 'angular';

const myCtrl = angular.module('companyApp.myCtrl',[])
.controller('myCtrl',($scope, $state, $window ,auth, search)=>{
   if(auth.isLoggedIn()){
      $scope.user = auth.currentUser();
   }
   if($scope.user){
      search.getMyPage($scope.user).success((response)=>{
         $scope.theUser = response.theUser;
         $scope.interests = response.interests;
      });
   }

   $scope.removeInterest = (user)=>{
      search.removeInterest(user.username,$scope.theUser.username).success((response)=>{
         console.log(response.message);
         console.log(response.user);
         $scope.interests.splice($scope.interests.indexOf(user),1);
      });
   };

   $scope.removeUser = ()=>{
      search.removeUser($scope.theUser.username).success((response)=>{
         console.log(response.message);
         auth.logOut();
         $state.go('home');
      });
   };

});

export default myCtrl;
