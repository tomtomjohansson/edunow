'use strict';
let User = require('./models/users.js');

// let users = [
//    {
//       usertype: 'company',
//       username: 'comHack',
//       password: 'yoyo',
//       name: 'comHack',
//       city: 'Stockholm',
//       description: "Vi är ett företag som älskar innovation. Bla bla, yata, yata.",
//       specialties: ['JavaScript','jQuery','AngularJS'],
//       interns: true,
//       projects: false,
//       interesting: ['olham'],
//    },
//    {
//       usertype: 'company',
//       username: 'clothes',
//       password: 'polo',
//       name: 'Nice Clothes',
//       city: 'Borås',
//       description: "Vi gör fina kläder. Vi behöver en webbplats där vi kan visa upp de fina kläderna. Vi gillar utvecklare.",
//       specialties: ['Java','.NET','ReactJS','JavaScript'],
//       interns: false,
//       projects: true
//    },
//    {
//       usertype: 'company',
//       username: 'webbing',
//       password: 'webstuff',
//       name: 'Hoola Bandoola',
//       city: 'Stockholm',
//       description: "Vi är en kreativ webbyrå som inte räds nya teknologier. Men helst av allt slänger vi ihop en webbsida med Wordpress.",
//       specialties: ['Wordpress','jQuery','PHP'],
//       interns: true,
//       projects: true
//    },
//    {
//       usertype: 'company',
//       username: 'startup',
//       password: 'starting',
//       name: 'SuperStarter',
//       city: 'Göteborg',
//       description: "Vi är ett startup-företag som ska revolutionera sättet man tänker på tid. Hjälp oss att koda fram en 25:e timma på dygnet.",
//       specialties: ['Java','Python','ReactJS','JavaScript','Swift'],
//       interns: true,
//       projects: false
//    },
//    {
//       usertype: 'student',
//       username: 'olham',
//       password: 'gogo',
//       name: 'Olle Hammar',
//       city: 'Göteborg',
//       school: 'JENSEN Education',
//       description: "Jag är en go grabb som gillar att koda i PHP. Jag är jäkligt duktig på det",
//       specialties: ['PHP','SQL','Laravel']
//    },
//    {
//       usertype: 'student',
//       username: 'gogru',
//       password: 'gruset',
//       name: 'Göran Grus',
//       city: 'Stockholm',
//       school: 'Fancy Educations',
//       description: "Jag har kodat sedan jag låg i vaggan. Kan allt man behöver veta. Gillar att gå på långa promenader.",
//       specialties: ['C#','C++','HTML5']
//    }
// ];

// user.save(function (err){
//    if(err){
//       return next(err);
//    }
//    else{
//       return res.json({user: user, token: user.generateJWT()})
//    }
// });
// });



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
