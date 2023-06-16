var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const io = require('./routes/socket')
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var Users = require('./model/user')
var {mongodb} = require('./config.json');
const { request } = require('http');
var app = express();
app.set('socketio', io);
var session = require('express-session');

var hbs = exphbs.create({
  helpers:{
    // Function to do basic mathematical operation in handlebar
    truncate: function(value) {
        if(value)
        {
          if (value.length > 24) {
            return value.substring(0, 24) + '...';
          }
          return value;
        }
    }
  },
  defaultLayout: '../layout.hbs',
  partialsDir: ['views']
});

app.engine('hbs', hbs.engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "secret",
 }));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.set('env','development')

// connect DB
switch(app.get('env')){
  case 'development':
    mongoose.connect(mongodb.development.connectString);
    console.log('\nSuccess connect to MongDB - development')
    break;
  case 'production':
    mongoose.connect(mongodb.production.connectString);
    console.log('\nSuccess connect to MongDB - production')
    break;
  default:
    throw new Error('\nUnknow execution environment: ' + app.get('env'));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
