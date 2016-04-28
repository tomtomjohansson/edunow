'use strict';
import angular from 'angular';

const SearchCtrl = angular.module('companyApp.SearchCtrl',[])
.controller('SearchCtrl',($scope, $state, $window ,auth, search)=>{
   $scope.user = {
   };

   $scope.technologies = ['JavaScript','Python','Ruby','SQL','noSQL','MongoDB','Node.js','C#','C++','PostgreSQL', 'Grunt','Gulp','Git','HTML5','SASS','LESS','jQuery','PHP','Laravel','Perl','Wordpress','Redis','Oracle',
   'Scala','.NET','Android','AngularJS','ReactJS','Bootstrap','Drupal','Django','Java','Swift'];
   $scope.choices = false;

   $scope.addTag = (tag)=>{
      $scope.choices = false;
      $scope.searching = "";
      if(!$scope.user.specialties){
         $scope.user.specialties = [];
         $scope.user.specialties.unshift(tag);
         $scope.technologies.splice($scope.technologies.indexOf(tag),1);
      }
      else{
         $scope.user.specialties.unshift(tag);
         $scope.technologies.splice($scope.technologies.indexOf(tag),1);
      }
   };

   function checkSpecialties(thing){
      let arr = [];
      for(var i in $scope.user.specialties){
         if(thing.specialties.indexOf($scope.user.specialties[i])>=0){
            if($scope.matchAll === true){
               arr.push(1);
            }
            else{
               return true;
            }
         }
      }
      if($scope.matchAll === true){
         if(arr.length === $scope.user.specialties.length){
            return true;
         }
      }
   }
   function checkAll(thing){
      if($scope.search !== ""){
      for(var i in thing){
         if(typeof thing[i] === 'string' && thing[i].indexOf($scope.search)>=0){
            return true;
         }
      }
      }
   }

   $scope.student = false;
   $scope.lastTerm = false;
   $scope.intern = false;
   $scope.project = false;
   $scope.matchAll = false;

   $scope.myCompanyFilter = (thing)=>{
      if(
      ($scope.name !== "" && thing.name.indexOf($scope.name)>=0) ||
      (($scope.user.specialties && $scope.user.specialties.length>0) &&
      checkSpecialties(thing)) ||
      ($scope.search !== "" && checkAll(thing)))
      {
         return true;
      }
   };

   $scope.myStudentFilter = (thing)=>{
      if(
      ($scope.school !== "" && thing.school.indexOf($scope.school)>=0) ||
      (($scope.user.specialties && $scope.user.specialties.length>0) &&
      checkSpecialties(thing)) ||
      ($scope.search !== "" && checkAll(thing)))
      {
         return true;
      }
   };

   $scope.removeChoice = (choice)=>{
      $scope.user.specialties.splice($scope.user.specialties.indexOf(choice),1);
      $scope.technologies.push(choice);
   };

   $scope.loggedIn = auth.currentUser();
   $scope.isLoggedIn = auth.isLoggedIn();

   if($state.is('students')){
      search.allStudents().success((response)=>{
         $scope.results = response.users;
      });
   }
   else{
      search.allCompanies().success((response)=>{
         $scope.results = response.users;
      });
   }



   $scope.addAsInteresting = (username)=>{
      console.log('adding interesting user');
      search.addAsInteresting(username,$scope.loggedIn.username);
   };

});

export default SearchCtrl;
