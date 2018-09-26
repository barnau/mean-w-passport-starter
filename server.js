
var createError = require('http-errors');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./server/config/database');
var favicon = require('serve-favicon');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var api = require('./server/routes/api');
//var auth = require('./server/routes/auth');
//var users = require('./server/routes/users');

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; //passport set up;
const app = express();

const port = process.env.PORT || 4200;

// passport.use(new GoogleStrategy({
//     clientID: '428998710508-mfdsrog11f5q9tju8jo258pbs6vgandq.apps.googleusercontent.com',
//     clientSecret: 'KKFsIF4hY5lxa9ovZkhuXlkk',
//     callbackURL: 'http://localhost:3000/auth/google/callback'
    
  
//   }, function(req, accessToken, refreshToken, profile, done) {
//     done(null, profile);
//   }));

app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(__dirname + '/dist/bflix'));

app.use(session({secret: 'anything'})); // passport set up; npm install express-session

app.use(passport.initialize()) // passport set up
app.use(passport.session());

// passport.serializeUser((user, done) => { // passport set up; store user in session
//     done(null, user)
// });
  
// passport.deserializeUser((user, done) => { // passport set up; retrieve user from session
//     done(null, user)
// });

app.use('/movies', express.static(__dirname + '/dist/bflix'));
app.use('/api', api);
//app.use('/users', users);
//app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname));
});

const server = http.createServer(app);

server.listen(port, () => {console.log('Running on port ' + port)});