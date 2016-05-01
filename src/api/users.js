'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('express-jwt');
const auth = jwt({secret: 'SECRET', userProperty: 'payload'});
const passport = require('passport');

// Gets request body from registration. Saves new user to database
router.post('/register', function(req, res, next){
   if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Please fill out all fields'});
   }
   var user = new User();
   user.username = req.body.username;
   user.contact = req.body.email;
   user.image = req.body.image;
   user.description = req.body.description;
   user.name = req.body.name;
   user.usertype = 'company';
   user.specialties = req.body.specialties;
   user.interns = req.body.interns;
   user.projects = req.body.projects;
   user.setPassword(req.body.password);
   user.save(function (err){
      if(err){
         return next(err);
      }
      else{
         return res.json({user: user, token: user.generateJWT()});
      }
   });
});

// Logs in the user. Returns user and webtoken
router.post('/login', function(req, res, next){
   if(!req.body.username || !req.body.password){
      return res.status(400).json({message: 'Var god fyll i alla fälten'});
   }
   passport.authenticate('local', function(err, user, info){
   if(err){
      return next(err);
   }
   if(user){
      console.log(user);
      return res.json({user: user, token: user.generateJWT()});
   }
   else{
      return res.status(401).json(info);
   }
   })(req, res, next);
});

module.exports = router;
