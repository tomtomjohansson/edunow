'use strict';
import angular from 'angular';

const myCtrl = angular.module('companyApp.myCtrl',[])
.controller('myCtrl',($scope, $state, $window, $timeout,auth, search)=>{
   if(auth.isLoggedIn()){
      $scope.user = auth.currentUser();
   }
   if($scope.user){
      search.getMyPage($scope.user).success((response)=>{
         $scope.theUser = response.theUser;
         $scope.interests = response.interests;
         $scope.filterTechs();
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

   $scope.updateUser = ()=>{
      search.updateUser($scope.theUser).success((response)=>{
         $scope.message = response.message;
      });
   };

   $scope.technologies = ['JavaScript','Python','Ruby','SQL','noSQL','MongoDB','Node.js','C#','C++','PostgreSQL', 'Grunt','Gulp','Git','HTML5','SASS','LESS','jQuery','PHP','Laravel','Perl','Wordpress','Redis','Oracle',
   'Scala','.NET','Android','AngularJS','ReactJS','Bootstrap','Drupal','Django','Java','Swift'];

   $scope.filterTechs = ()=>{
      $scope.techsFiltered = $scope.technologies.filter((x)=>{
         return $scope.theUser.specialties.indexOf(x)<0;
      });
   };

   $scope.choices = false;

   $scope.addTag = (tag)=>{
      $scope.choices = false;
      $scope.searching = "";
      if(!$scope.theUser.specialties){
         $scope.theUser.specialties = [];
         $scope.theUser.specialties.unshift(tag);
         $scope.techsFiltered.splice($scope.techsFiltered.indexOf(tag),1);
      }
      else{
         $scope.theUser.specialties.unshift(tag);
         $scope.techsFiltered.splice($scope.techsFiltered.indexOf(tag),1);
      }
   };

   $scope.removeChoice = (choice)=>{
      $scope.theUser.specialties.splice($scope.theUser.specialties.indexOf(choice),1);
      $scope.techsFiltered.push(choice);
   };

});

export default myCtrl;
