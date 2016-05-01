'use strict';
let User = require('./models/users.js');

var tomas = new User();
tomas.username = 'tomjoh';
tomas.contact = 'tomjoh@edunow.com';
tomas.description = "Forage vice sartorial qui. Waistcoat tilde locavore, typewriter +1 yuccie portland pork belly fingerstache quinoa chillwave banh mi direct trade YOLO. Tattooed austin sartorial excepteur, elit kombucha fanny pack humblebrag meditation et. Venmo chicharrones beard retro direct trade.";
tomas.name = "Tomas Johansson";
tomas.usertype = 'student';
tomas.specialties = ['JavaScript','AngularJS','SASS','Node.js','MongoDB','jQuery'];
tomas.school = 'JENSEN Education';
tomas.semesters = {current:2,total:4};
tomas.points = 240;
tomas.setPassword('tomjoh');

var david = new User();
david.username = 'davhav';
david.contact = 'davhav@edunow.com';
david.description = "Forage vice sartorial qui. Waistcoat tilde locavore, typewriter +1 yuccie portland pork belly fingerstache quinoa chillwave banh mi direct trade YOLO. Tattooed austin sartorial excepteur, elit kombucha fanny pack humblebrag meditation et. Venmo chicharrones beard retro direct trade.";
david.name = "David Havström";
david.usertype = 'student';
david.specialties = ['JavaScript','Java','PHP','Perl','MongoDB','Node.js','noSQL','Wordpress','jQuery'];
david.school = 'YRGO';
david.semesters = {current:4,total:4};
david.points = 740;
david.setPassword('davhav');

var mikael = new User();
mikael.username = 'mikber';
mikael.contact = 'mikber@edunow.com';
mikael.description = "Forage vice sartorial qui. Waistcoat tilde locavore, typewriter +1 yuccie portland pork belly fingerstache quinoa chillwave banh mi direct trade YOLO. Tattooed austin sartorial excepteur, elit kombucha fanny pack humblebrag meditation et. Venmo chicharrones beard retro direct trade.";
mikael.name = "Mikael Berg";
mikael.usertype = 'student';
mikael.specialties = ['JavaScript','Java','Ruby','ReactJS','AngularJS','Node.js','Swift','Wordpress'];
mikael.school = 'YRGO';
mikael.semesters = {current:5,total:4};
david.points = 440;
mikael.setPassword('mikber');

var johnny = new User();
johnny.username = 'johhan';
johnny.contact = 'johhan@edunow.com';
johnny.description = "Forage vice sartorial qui. Waistcoat tilde locavore, typewriter +1 yuccie portland pork belly fingerstache quinoa chillwave banh mi direct trade YOLO. Tattooed austin sartorial excepteur, elit kombucha fanny pack humblebrag meditation et. Venmo chicharrones beard retro direct trade.";
johnny.name = "Johnny Hansson";
johnny.usertype = 'student';
johnny.specialties = ['Java','Swift','SQL','Redis','Ruby','PHP','Gulp','Wordpress','jQuery'];
johnny.school = 'YRGO';
johnny.semesters = {current:3,total:4};
johnny.points = 163;
johnny.setPassword('mikber');

var conny = new User();
conny.username = 'conban';
conny.contact = 'conban@edunow.com';
conny.description = "Forage vice sartorial qui. Waistcoat tilde locavore, typewriter +1 yuccie portland pork belly fingerstache quinoa chillwave banh mi direct trade YOLO. Tattooed austin sartorial excepteur, elit kombucha fanny pack humblebrag meditation et. Venmo chicharrones beard retro direct trade.";
conny.name = "Conny Bangård";
conny.usertype = 'student';
conny.specialties = ['Java','JavaScript','SQL','noSQL','Perl','PHP','Grunt','SASS','jQuery'];
conny.school = 'Jensen Education';
conny.semesters = {current:1,total:4};
conny.points = 45;
conny.setPassword('conban');

var donny = new User();
donny.username = 'dondar';
donny.contact = 'dondar@edunow.com';
donny.description = "Forage vice sartorial qui. Waistcoat tilde locavore, typewriter +1 yuccie portland pork belly fingerstache quinoa chillwave banh mi direct trade YOLO. Tattooed austin sartorial excepteur, elit kombucha fanny pack humblebrag meditation et. Venmo chicharrones beard retro direct trade.";
donny.name = "Donny Darkman";
donny.usertype = 'student';
donny.specialties = ['Grunt','JavaScript','SQL','noSQL','jQuery','Java','Gulp','HTML5'];
donny.school = 'Jensen Education';
donny.semesters = {current:4,total:4};
donny.points = 671;
donny.setPassword('conban');

let users = [tomas,david,mikael,johnny,conny,donny];
users.forEach((user,index)=>{
   User.find({name:user.name},(err, users)=>{
      if(!err && !users.length){
         User.create(user);
         console.log(user.name);
      }
   });
});
