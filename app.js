const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');

const homeRoute = require('./routes/home');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const loginRouter = require('./routes/login');
const registerRoute = require('./routes/register');
const searchRoute = require('./routes/search');

const app = express();
//const url ='mongodb+srv://shimaa:Shemo$2864@cluster0.f4td6.mongodb.net/MyDb?retryWrites=true&w=majority';
//async function connect (){
//    await mongoose.connect(url);
//}
// connect to database
mongoose.connect('mongodb://localhost:27017/ecommerceDB', {
  useNewUrlParser: true
});

app.locals = {
  display: 'none',
  app: app
};
// view engine setup
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
);
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));
app.use('/login', loginRouter);
app.use('/', homeRoute);
app.use('/search', searchRoute);
app.use('/category/:category', categoryRoute);
app.use('/product/:product', productRoute);
app.use('/cart', cartRoute);
app.use('/cart/:product', cartRoute);
app.use('/login', loginRouter);

app.use(function (req, res) {
  res.status(404).send('404 Not Found');
});

app.use('/register', registerRoute);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
