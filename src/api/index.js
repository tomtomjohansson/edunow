'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/users');

// router.get('/students',(req,res,next)=>{
//    let queries = User.find({usertype:"student"});
//    queries.exec((err,users)=>{
//       if(err){
//          return res.status(500).json({message: err.message});
//       }
//       else{
//          res.json({users:users,message:"Found users"});
//       }
//    });
// });

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

router.post('/mypage',(req,res,next)=>{
   // console.log(req.body);
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
