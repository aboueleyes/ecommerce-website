var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const url ='mongodb+srv://shimaa:Shemo$2864@cluster0.f4td6.mongodb.net/MyDb?retryWrites=true&w=majority';
//const url = 'localhost:27017/users';
const mongoose = require('mongoose');
async function connect (){
    await mongoose.connect(url);
}
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
app.listen(3000, connect().then(()=> {
    console.log("Server is running on port 30000")
}) 
);


