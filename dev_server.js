var express = require('express'),
    // mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    api = require('./server/routes/api'),
    config = require('./server/config/database')
var passport = require('passport');
var session = require('express-session');
var mongoose = require('./server/config/connection');


//var db = mongoose.connect('mongodb://localhost/bookAPI', {useNewUrlParser: true})
// mongoose.Promise = require('bluebird');
// mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
//   .then(() =>  console.log('connection succesful'))
//   .catch((err) => console.error(err));

var app = express();

var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(session({secret: 'anything'})); // passport set up; npm install express-session

app.use(passport.initialize()) // passport set up
app.use(passport.session());

app.use('/api', api);

app.get('/', (req, res) => {
    res.send('welcome to my api!');
});

app.listen(port, () => {
    console.log('Gulp is running my app on PORT: ' + port)
});