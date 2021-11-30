/* eslint-disable arrow-parens */
const express = require('express');
// const mongoose = require('mongoose');
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
  const userName = req.body.username;
  const { password } = req.body;
  // hash password
  const hashedPassword = bcrypt.hashSync(password, 10);
  register(userName, hashedPassword).then(verify => {
    if (verify === 'yes') {
      res.redirect('/')
    }
    else{  
      res.render('registration', {ok : verify} );
    }
  });
});
/* GET registration page */
router.get('/', (req, res, next) => {
  res.render('registration');
});

module.exports = router;
