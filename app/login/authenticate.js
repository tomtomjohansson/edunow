'use strict'
import angular from 'angular';

const AuthCtrl = angular.module('companyApp.AuthCtrl',[])
.controller('AuthCtrl',($scope, $state, $window ,auth)=>{
   $scope.user = {};

   // Gets list of tags to choose from in registration.
   $scope.technologies = ['JavaScript','Python','Ruby','SQL','noSQL','MongoDB','Node.js','C#','C++','PostgreSQL', 'Grunt','Gulp','Git','HTML5','SASS','LESS','jQuery','PHP','Laravel','Perl','Wordpress','Redis','Oracle',
   'Scala','.NET','Android','AngularJS','ReactJS','Bootstrap','Drupal','Django','Java','Swift'];

   $scope.step1 = true;
   $scope.choices = false;

   // Add tag to list of specialties. Adds to search-list. Removes from list of selectable techs..
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

   // Remove tag from search-list. Reinstate in to list of selectable techs.
   $scope.removeChoice = (choice)=>{
      $scope.user.specialties.splice($scope.user.specialties.indexOf(choice),1);
      $scope.technologies.push(choice);
   };

   // Uses function in auth to check if user is logged in
   $scope.loggedIn = auth.currentUser();

   // Registration. $http request in auth-factory. If no errors happen, go to myPage.
   $scope.register = ()=>{
      auth.register($scope.user).error((error)=>{
         $scope.error = error;
      }).then(()=>{
         $state.go('myPage');
      });
   };

   // Login. $http request in auth-factory. If succesful, go to myPage.
   $scope.logIn = ()=>{
      auth.logIn($scope.user).error((error)=>{
         $scope.error = error;
      }).then(()=>{
            $state.go('myPage');
      });
   };

   // Logout in auth-factory, clears local-storage. Then go to home.
   $scope.logOut = ()=>{
      auth.logOut();
      $state.go('home');
   };

});

export default AuthCtrl;
