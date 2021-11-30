var express = require('express');
var router = express.Router();
var User = require('../database/userModel');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const url =
  'mongodb+srv://shimaa:Shemo$2864@cluster0.f4td6.mongodb.net/MyDb?retryWrites=true&w=majority';
  
const url_ibrahim = 'localhost:27017/users';
async function register(userName, password) {
  await mongoose.connect(url);
  const user = new User({ userName: userName, password: password });
  var verify = 'yes';
  await user.save().catch(err => {
    if (err) {
      verify = 'no';
    }
  });
  return verify;
}
/* POST registration into db. */
router.post('/', (req, res, next) => {
  var userName = req.body.username;
  var password = req.body.password;
  // hash password
  var hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  register(userName, hashedPassword).then(verify => {
    if (verify === 'yes') {
      res.redirect('/')
    }
    else{  
      res.render('registration', {ok : verify} );
    }
  });
});
/* GET registration page*/
router.get('/', function (req, res, next) {
  res.render('registration');
});

module.exports = router;
