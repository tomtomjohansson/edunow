'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Gets all the users for searches. Divides them into students and companys.
router.get('/users',(req,res,next)=>{
   User.find({},(err,users)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         let students = users.filter((x)=>{
            return x.usertype === 'student';
         });
         let companies = users.filter((x)=>{
            return x.usertype === 'company';
         });
         res.json({users:users,students:students,companies:companies,message:"Found users"});
      }
   });
});

// Gets user for userpages. Gets info on tags of the user.
router.get('/users/:username',(req,res,next)=>{
   let username =req.params.username;
   User.findOne({username:username},(err,user)=>{
      if (err) {
         return res.status(500).json({noUser:"Användaren finns inte",message: err.message});
      }
      else{
         let tags = user.infoAboutTags(sendJson);
      }
      function sendJson(tags){
         res.json({user:user,tags:tags,message:"Found user with username"});
      }
   });
});

// Updates the user.
router.put('/users',(req,res,next)=>{
   let user = req.body;
   let option = {new:true};
   User.findOneAndUpdate({username:req.body.username},user,option,(err,user)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         console.log(user);
         res.json({user:user, message:"Dina uppgifter har uppdaterats"});
      }
   });
});

// Deletes a user
router.delete('/users/:username',(req,res,next)=>{
   let username =req.params.username;
   User.findOneAndRemove({username:username},(err,user)=>{
      if (err) {
         return res.status(500).json({noUser:"Användaren finns inte",message: err.message});
      }
      else{
         res.json({user:user, message:"Removed user with username"});
      }
   });
});

// Gets info for landingpage.
router.get('/home',(req,res,next)=>{
   User.aggregate(
         {$project:{
            'student':{$cond:[{$eq:['$usertype','student']},1,0]},
            'company':{$cond:[{$eq:['$usertype','company']},1,0]},
            'studentSpecs':{$cond:[{$eq:['$usertype','student']},{$size:'$specialties'},0]},
            'companySpecs':{$cond:[{$eq:['$usertype','company']},{$size:'$specialties'},0]},
         }},
         {$group:{_id:'stuff',numberOfStud:{$sum:'$student'},numberOfCom:{$sum:'$company'},numberOfStudSpecs:{$sum:'$studentSpecs'},numberOfComSpecs:{$sum:'$companySpecs'}}},(err,object)=>{
      if (err) {
         return res.status(500).json({noUser:"Something went wrong",message: err.message});
      }
      else{
         res.json({object:object, message:"Found info for homepage"});
      }
   });
});

// Updates the users list of interests. Depending on request-body performs a pull or a push.
router.put('/interesting',(req,res,next)=>{
   let condition = {username:req.body.user};
   let update;
   let option = {new:true};
   if(req.body.change === 'Add'){
      update = {$push:{interesting:req.body.interesting}};
   }
   else if(req.body.change === 'Remove'){
      update = {$pull:{interesting:req.body.interesting}};
   }
   User.findOneAndUpdate(condition,update,option,(err,user)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({user:user,message:"Din lista med intressanta användare uppdaterades."});
      }
   });
});

// Gets info for my page. Finds the user and then gets the users he/she finds interesting.
router.post('/mypage',(req,res,next)=>{
   User.findOne({username:req.body.username},(err,user)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         user.findInteresting().then((result)=>{
            res.json({theUser:user,interests:result,message:"User for my page."});
         });
      }
   });
});

module.exports = router;
