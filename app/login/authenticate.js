'use strict'
import angular from 'angular';

const AuthCtrl = angular.module('companyApp.AuthCtrl',[])
.controller('AuthCtrl',($scope, $state, $window ,auth)=>{
   $scope.user = {};

   $scope.technologies = ['Javascript','Python','Ruby','SQL','noSQL','MongoDB','Node.js','C#','C++','PostgreSQL', 'Grunt','Gulp','Git','HTML5','SASS','LESS','jQuery','PHP','Laravel','Perl','Wordpress','Redis','Oracle',
   'Scala','.NET','Android','AngularJS','ReactJS','Bootstrap','Drupal','Django','Java','Swift'];

   $scope.step1 = true;
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

   $scope.register = ()=>{
      auth.register($scope.user).error((error)=>{
         $scope.error = error;
      }).then(()=>{
         $state.go('home');
      });
   };

   $scope.logIn = ()=>{
      auth.logIn($scope.user).error((error)=>{
         $scope.error = error;
      }).then(()=>{
            $state.go('home');
      });
   };
   $scope.logOut = ()=>{
      auth.logOut();
      $state.go('home');
   };

});

export default AuthCtrl;
