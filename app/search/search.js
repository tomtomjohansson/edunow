'use strict';
import angular from 'angular';

const SearchCtrl = angular.module('companyApp.SearchCtrl',[])
.controller('SearchCtrl',($scope, $state, $window ,auth, search)=>{

   let passOn;
   $scope.isLoggedIn = auth.isLoggedIn();

   $scope.technologies = ['JavaScript','Python','Ruby','SQL','noSQL','MongoDB','Node.js','C#','C++','PostgreSQL', 'Grunt','Gulp','Git','HTML5','SASS','LESS','jQuery','PHP','Laravel','Perl','Wordpress','Redis','Oracle',
   'Scala','.NET','Android','AngularJS','ReactJS','Bootstrap','Drupal','Django','Java','Swift'];
   $scope.choices = false;


   $scope.user = {};
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

   $scope.removeChoice = (choice)=>{
      $scope.user.specialties.splice($scope.user.specialties.indexOf(choice),1);
      $scope.technologies.push(choice);
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

   function checkIntern(thing){
      if($scope.intern === true){
         if(thing.interns === true){
            return true;
         }
      }
      else{
         return true;
      }
   }

   function checkTerm(thing){
      if($scope.lastTerm === true){
         if(thing.semesters[0].current === thing.semesters[0].total){
            return true;
         }
      }
      else{
         return true;
      }
   }

   $scope.lastTerm = false;
   $scope.intern = false;
   $scope.matchAll = false;

   $scope.myCompanyFilter = (thing)=>{
      if(
      ((($scope.user.specialties && $scope.user.specialties.length>0) &&
      checkSpecialties(thing)) ||
      ($scope.search !== "" && checkAll(thing)) ||
      ($scope.name !== "" && thing.name.indexOf($scope.name)>=0)) &&
      (checkIntern(thing)))
      {
         return true;
      }
   };

   $scope.myStudentFilter = (thing)=>{
      if(
      ((($scope.user.specialties && $scope.user.specialties.length>0) &&
      checkSpecialties(thing)) ||
      ($scope.search !== "" && checkAll(thing)) ||
      ($scope.school !== "" && thing.school.indexOf($scope.school)>=0)) &&
      (checkTerm(thing)))
      {
         return true;
      }
   };

   search.allUsers().success((response)=>{
      $scope.allUsers = response.users;
      if($state.is('students')){
         $scope.results = response.students;
      }
      else if($state.is('companies')){
         $scope.results = response.companies;
      }
      if($scope.isLoggedIn){
         passOn = auth.currentUser();
         $scope.currentUser = $scope.allUsers.find((x)=>{
            return x.username === passOn.username;
         });
         $scope.results.forEach((x)=>{
            if($scope.currentUser.interesting.indexOf(x.username)>=0){
               x.isInteresting = true;
            }
            else{
               x.isInteresting = false;
            }
         });
      }
   });

   $scope.addAsInteresting = (username)=>{
      console.log('adding interesting user');
      search.addAsInteresting(username,$scope.currentUser.username);
   };

});

export default SearchCtrl;
