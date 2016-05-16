'use strict';
const angular = require('angular');

const searchFactory = angular.module('companyApp.search', [])
.factory('search', ['$http', '$window', ($http, $window)=>{
   let search = {};

   // Http.request. Gets all users in database.
   search.allUsers = () => $http.get('/api/users');

   // Http.request. Username comes from url-params. Request for one user from database.
   search.getUserpage = (username) => $http.get('api/users/'+username);

   // Http.request. User comes from logged in user. Returns updated user.
   search.updateUser = (user) => $http.put('/api/users',user);

   // Http.request. Username from logged in user. Removes that user from database. Returns removed user.
   search.removeUser = (username) => $http.delete('/api/users/'+username);

   // Http.request. Returns aggregated array with object.
   search.getHomePage = () => $http.get('/api/home/');

   // Http.request. Added is username to be added. User is logged in user. Adds 'added' to 'user'-array of interesting users. Returns updated logged in user.
   search.addAsInteresting = (added,user)=>{
      let interest = {
         interesting:added,
         user:user,
         change: 'Add'
      };
      return $http.put('/api/interesting',interest);
   };

   // Http.request. Removed is username to be removed. User is logged in user. Removes 'removed' from 'user'-array of interesting users. Returns updated logged in user.
   search.removeInterest = (removed,user)=>{
      let interest = {
         interesting:removed,
         user:user,
         change: 'Remove'
      };
      return $http.put('/api/interesting',interest);
   };

   // Http.request. User is logged in user from local-storage. Returns the user. And array of ojbects containing the users that are in the logged in users array of interesting users.
   search.getMyPage = (user) => $http.post('/api/mypage',user);

   return search;
}]);

export default searchFactory;
