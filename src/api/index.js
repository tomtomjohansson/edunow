'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/students',(req,res,next)=>{
   User.find({usertype:"student"},(err,users)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({users:users,message:"Found users"});
      }
   });
});

router.get('/companies',(req,res,next)=>{
   User.find({usertype:"company"},(err,users)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         res.json({users:users,message:"Found users"});
      }
   });
});

router.put('/interesting',(req,res,next)=>{
   console.log(req.body);
   User.findOneAndUpdate({username:req.body.user},{$push:{interesting:req.body.added}},{new:true},(err,user)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         console.log(user);
         res.json({user:user,message:"Added as interesting"});
      }
   });
});

router.post('/mypage',(req,res,next)=>{
   console.log(req.body);
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
