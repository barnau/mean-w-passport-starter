var mongoose = require('mongoose');
var config = require('./database');

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesfull'))
  .catch((err) => console.error(err));

module.exports = mongoose;
