const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const { StatusCodes } = require('http-status-codes');

const homeRoute = require('./routes/home');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const registerRoute = require('./routes/register');
const searchRoute = require('./routes/search');

const app = express();
const url = 'mongodb+srv://shimaa:Shemo$2864@cluster0.f4td6.mongodb.net/MyDb?retryWrites=true&w=majority';
async function connect() {
  await mongoose.connect(url);
}
// connect to database
//mongoose.connect('mongodb://localhost:27017/ecommerceDB', {
//  useNewUrlParser: true
//});

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
app.use('/', express.static(path.join(__dirname + 'public')));

// routes
app.use('/login', loginRoute);
app.use('/', homeRoute);
app.use('/search', searchRoute);
app.use('/category/:category', categoryRoute);
app.use('/product/:product', productRoute);
app.use('/cart', cartRoute);
app.use('/cart/:product', cartRoute);
app.use('/register', registerRoute);
app.use('/logout', logoutRoute);

const port = process.env.PORT || 3000;
app.use(function (req, res) {
  res.status(StatusCodes.NOT_FOUND).render('error', {
    title: '404 NOT FOUND',
    message: 'Error 404 : Page Not Found'
  });
});

app.listen(port, connect().then(() => {
  console.log('Server is running on port 3000');
}));
