'use strict'
import angular from 'angular';

const SearchCtrl = angular.module('companyApp.SearchCtrl',[])
.controller('SearchCtrl',($scope, $state, $window ,auth, search)=>{
   $scope.user = {};
   // $scope.results = [];

   $scope.technologies = ['Javascript','Python','Ruby','SQL','noSQL','MongoDB','Node.js','C#','C++','PostgreSQL', 'Grunt','Gulp','Git','HTML5','SASS','LESS','jQuery','PHP','Laravel','Perl','Wordpress','Redis','Oracle',
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

   $scope.removeChoice = (choice)=>{
      $scope.user.specialties.splice($scope.user.specialties.indexOf(choice),1);
      $scope.technologies.push(choice);
   };

   $scope.loggedIn = auth.currentUser();
   $scope.isLoggedIn = auth.isLoggedIn();

   search.allStudents().success((response)=>{
      $scope.results = response.users;
   });

   $scope.addAsInteresting = (username)=>{
      console.log('adding interesting user');
      search.addAsInteresting(username,$scope.loggedIn.username);
   };

});

export default SearchCtrl;
