'use strict'
import angular from 'angular';

const navDir = angular.module('companyApp.navDir',[])
.directive('navigation',()=>{
   return {
      templateUrl: '../templates/nav.html'
   };
});

export default navDir;
