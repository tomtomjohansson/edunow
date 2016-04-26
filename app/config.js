import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import auth from 'factories/users';
import AuthCtrl from 'login/authenticate.js';
import HomeCtrl from 'home/home.js';
import navCtrl from 'navigation/navigation.js';
import navDir from 'navigation/navDirective.js';
import myCtrl from 'myPage/myPage.js';

const app = angular.module('companyApp', [uiRouter,ngAnimate,auth.name,AuthCtrl.name,HomeCtrl.name,navCtrl.name,navDir.name,myCtrl.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider)=>{
   // $urlRouterProvider.otherwise('/');
   $stateProvider
      .state('home', {
         url: '/',
         template: require('home/home.html'),
         controller: 'HomeCtrl',
      })
      .state('students',{
         url: '/students',
         template: require('search/students.html')
      })
      .state('companies',{
         url: '/companies',
         template: require('search/companies.html')
      })
      .state('myPage',{
         url: '/minsida',
         template: require('myPage/myPage.html'),
         controller: 'myCtrl',
      })
      .state('login', {
         url: '/login',
         template: require('login/login.html'),
         controller: 'AuthCtrl',
         onEnter: ['$state','$window','$timeout',($state, $window, $timeout)=>{
            $timeout(()=>{
               if($window.localStorage['user-token']){
                  // $state.go('home');
                  console.log('logged in should log out');
               }
            },0);
         }]
      })
      .state('register', {
         url: '/register',
         template: require('login/register.html'),
         controller: 'AuthCtrl',
         onEnter: ['$state','$window','$timeout',($state, $window, $timeout)=>{
            $timeout(()=>{
               if($window.localStorage['user-token']){
                  $state.go('home');
               }
            },0);
         }]
      });

   $locationProvider.html5Mode(true);
});


export default app;
