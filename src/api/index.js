'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/users',(req,res,next)=>{
   User.find({username:'comHack'},(err,users)=>{
      if(err){
         return res.status(500).json({message: err.message});
      }
      else{
         users[0].findInteresting().then((result)=>{
            res.json({users:users,names:result,message:"Found users"});
         });
      }
   });
});

module.exports = router;
