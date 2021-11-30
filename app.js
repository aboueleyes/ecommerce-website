const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// routes
const homeRoute = require('./routes/home');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', homeRoute);
app.use('/category/:cat', categoryRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
