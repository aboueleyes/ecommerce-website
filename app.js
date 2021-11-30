
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// routes
const homeRoute = require('./routes/home');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
var loginRouter = require('./routes/login');
var registerRoute = require('./routes/register');
const app = express();

// connect to database
mongoose.connect('mongodb://localhost:27017/ecommerceDB', {
  useNewUrlParser: true
});



// view engine setup
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));

app.use('/', homeRoute);
app.use('/category/:category', categoryRoute);
app.use('/product/:product', productRoute);
app.use('/cart', cartRoute);
app.use('/login', loginRouter);
app.use('/register', registerRoute);
app.listen(3000, function () {
  console.log('Server is running on port 3000');
});




