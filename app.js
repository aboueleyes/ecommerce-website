const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const portNumber = process.env.PORT || 27017;
mongoose.connect(`mongodb://localhost:${portNumber}`);

// const user = new userModel({
//   userName: 'ibrahim2',
//   password: 'ibrahim_password'
// });

// user.save((err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// declare Routers
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const homeRoute = require('./routes/home');
const registerRoute = require('./routes/register');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/images')));

// link Routers
app.use('/', indexRouter);
app.use('/home', homeRoute);
app.use('/register', registerRoute);
app.use('/login', loginRouter);
// launch server
app.listen(3000, () => {
});
