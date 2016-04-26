'use strict';
const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const router = require('./src/api');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');

require('./src/database');
// require('./src/seed');
require('./src/models/users');
require('./config/passport');

// app.use('/', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.json());
app.use(passport.initialize());
app.use('/api', router);

app.get('/*', (req, res,next)=>{
   res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT,(err)=>{
   if(err){
      console.log('Failed to connect');
   }
   else{
      console.log('Connected to server '+PORT);
   }
});
