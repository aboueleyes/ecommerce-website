var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// declare Routers
var loginRouter = require('./routes/login');
var homeRoute = require('./routes/home');
var registerRoute = require('./routes/register');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/images')));

// link Routers
app.use('/', loginRouter);
app.use('/home', homeRoute);
app.use('/register', registerRoute);
// launch server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
