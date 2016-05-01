'use strict';
import angular from 'angular';

const myCtrl = angular.module('companyApp.myCtrl',[])
.controller('myCtrl',($scope, $state, $window, $timeout,auth, search)=>{
   // If user is logged in, grabs user saved in local-storage and uses it for searching database. User saved in local-storage does not get updated. theUser contains object of user. Interests contains objects of the users that are in theUser:s interesting-list.
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

   // Remove interest from intersting-list in database. Splice out object to remove from view instantly.
   // Parameter references user to be removed.
   $scope.removeInterest = (user)=>{
      search.removeInterest(user.username,$scope.theUser.username).success((response)=>{
         $scope.interests.splice($scope.interests.indexOf(user),1);
      });
   };

   // Deletes the user from the database. Entire account deleted. Also removes all that is saved in local-storage through logOut. Redirects to 'home'-state.
   $scope.removeUser = ()=>{
      search.removeUser($scope.theUser.username).success((response)=>{
         console.log(response.message);
         auth.logOut();
         $state.go('home');
      });
   };

   // Updates entire theUser in database. Done in update.html.
   $scope.updateUser = ()=>{
      search.updateUser($scope.theUser).success((response)=>{
         $scope.message = response.message;
      });
   };

   // Gets list for updating the user
   $scope.technologies = ['JavaScript','Python','Ruby','SQL','noSQL','MongoDB','Node.js','C#','C++','PostgreSQL', 'Grunt','Gulp','Git','HTML5','SASS','LESS','jQuery','PHP','Laravel','Perl','Wordpress','Redis','Oracle',
   'Scala','.NET','Android','AngularJS','ReactJS','Bootstrap','Drupal','Django','Java','Swift'];

   // Filter the techs to remove those that are already in theUsers specialties.
   $scope.filterTechs = ()=>{
      $scope.techsFiltered = $scope.technologies.filter((x)=>{
         return $scope.theUser.specialties.indexOf(x)<0;
      });
   };

   // choices true when selecting from list of specialties.
   $scope.choices = false;
   // Add tag to list of specialties. Adds to users list. Removes from list of selectable techs..
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

   // Remove tag from specialties list. Reinstate in to list of selectable techs.
   $scope.removeChoice = (choice)=>{
      $scope.theUser.specialties.splice($scope.theUser.specialties.indexOf(choice),1);
      $scope.techsFiltered.push(choice);
   };

});

export default myCtrl;
