'use strict';
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
   usertype: String,
   username: {type: String, lowercase: true, unique: true},
   hash: String,
   salt: String,
   name: String,
   contact: String,
   image: String,
   points: Number,
   city: String,
   school: {type:String,'default':'none'},
   description: String,
   specialties: [String],
   semesters: [{current:{type:Number,"default":0},total:{type:Number,"default":0}}],
   interns: {type:Boolean,"default":false},
   projects: {type:Boolean,"default":false},
   interesting: [String],
});

userSchema.methods.findInteresting = function findInteresting(){
   return this.model('User').find({ username: {$in:this.interesting}});
};

userSchema.methods.infoAboutTags = function infoAboutTags(cb){
   // console.log(this.specialties);
   let tagArr = [];
   this.specialties.forEach((specialty)=>{
      this.model('User').aggregate([
         {$match:{specialties:specialty}},
         {$project:{
            'student':{$cond:[{$eq:['$usertype','student']},1,0]},
            'company':{$cond:[{$eq:['$usertype','company']},1,0]}
         }},
         {$group:{_id:specialty,numberOfStud:{$sum:'$student'},numberOfCom:{$sum:'$company'}}}
      ],(err,object)=>{
         if(err){
            console.log('fuck it'+err);
         }
         else{
            // console.log(object);
            tagArr.push(object[0]);
            if(tagArr.length === this.specialties.length){
               cb(tagArr);
            }
         }
      });
   });
};

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 90);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
