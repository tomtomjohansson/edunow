// Import factories, controllers and directives.
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import auth from 'factories/users';
import search from 'factories/searches';
import AuthCtrl from 'login/authenticate.js';
import HomeCtrl from 'home/home.js';
import navCtrl from 'navigation/navigation.js';
import navDir from 'navigation/navDirective.js';
import myCtrl from 'myPage/myPage.js';
import SearchCtrl from 'search/search.js';
import UserpageCtrl from 'userPage/userpage.js';

// Defines the application and its dependencies
const app = angular.module('companyApp', [uiRouter,ngAnimate,auth.name,search.name,AuthCtrl.name,HomeCtrl.name,navCtrl.name,navDir.name,myCtrl.name,SearchCtrl.name,UserpageCtrl.name]);

// Provides routes. State references internal navigation. Templates found in subfolders.
app.config(($stateProvider, $urlRouterProvider, $locationProvider)=>{
   $urlRouterProvider.otherwise('/');
   $stateProvider
      .state('home', {
         url: '/',
         template: require('home/home.html'),
         controller: 'HomeCtrl',
      })
      .state('students',{
         url: '/students',
         template: require('search/students.html'),
         controller: 'SearchCtrl',
      })
      .state('companies',{
         url: '/companies',
         template: require('search/companies.html'),
         controller: 'SearchCtrl',
      })
      .state('myPage',{
         url: '/minsida',
         template: require('myPage/myPage.html'),
         controller: 'myCtrl',
      })
      .state('update',{
         url: '/minsida/update',
         template: require('myPage/update.html'),
         controller: 'myCtrl',
         onEnter: ['$state','$window','$timeout',($state, $window, $timeout)=>{
            $timeout(()=>{
               if(!$window.localStorage['user-token']){
                  $state.go('home');
               }
            },0);
         }]
      })
      .state('userpage',{
         url: '/user/:username',
         template: require('userPage/userpage.html'),
         controller: 'UserpageCtrl',
      })
      .state('login', {
         url: '/login',
         template: require('login/login.html'),
         controller: 'AuthCtrl'
      })
      .state('register', {
         url: '/register',
         template: require('login/register.html'),
         controller: 'AuthCtrl',
         onEnter: ['$state','$window','$timeout',($state, $window, $timeout)=>{
            $timeout(()=>{
               if($window.localStorage['user-token']){
                  $state.go('myPage');
               }
            },0);
         }]
      });

   $locationProvider.html5Mode(true);
});


export default app;
