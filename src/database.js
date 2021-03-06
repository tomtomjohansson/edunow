'use strict';
const mongoose = require('mongoose');

// Connect to Mongo database
mongoose.connect('mongodb://localhost/project', (err)=>{
   if(err){
      console.log('Failed connecting to database');
   }
   else{
      console.log('Connected to database');
   }
});

// Close connection if server is shut down
process.on('SIGINT', ()=> {
  mongoose.connection.close( ()=> {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
