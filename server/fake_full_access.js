var User = require('./models/user');
// var mongoose = require('mongoose');
// var config = require('./config/database');

// mongoose.Promise = require('bluebird');
// mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
//   .then(() =>  console.log('connection succesful'))
//   .catch((err) => console.error(err));
var mongoose = require('./config/connection');

  var adminUser = User({
      username: 'fullaccess',
      password: 'fullaccess',
      fullAccess: true
  });
  

  User.findOne({username: adminUser.username}, (err, user) => {
    if(err) {
        adminUser.save((err) => {
            if(err) {
                console.log('failed to create user. ' + err)
            } else {
                console.log('Created user.')
            }
        })
    }
    console.log('User already exists. ' + user.username)
  })

//   User.findOne({username: 'blainearnau@gmail.com'}, (err, user) => {

//     if(!err) {
//         console.log(user.username)
//         user.fullAccess = false;
//         user.save();
//         console.log(user.fullAccess)
//     } else {
//         console.log(err)
//     }
//   });

  var users = User.find({}, (err, users) => {
      console.log(' ')
      console.log('Here are all users..')
      users.forEach((user) => {
        console.log('username:' + user.username);
        console.log('full access:' + user.fullAccess);
        console.log('   ');
        if(user.username !== adminUser.username && !user.fullAccess === undefined) {
            user.fullAccess = false;
            user.save((err) => {
                if(!err) {
                    console.log('Updated full access off for ' + user.username);
                }
            })
        }
        })
  });
  

