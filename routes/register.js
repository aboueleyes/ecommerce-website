/* eslint-disable arrow-parens */
const express = require('express');
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../database/userModel');

const router = express.Router();
// const url =
//   'mongodb+srv://shimaa:Shemo$2864@cluster0.f4td6.mongodb.net/MyDb?retryWrites=true&w=majority';
// const urlIbrahim = 'localhost:27017/products';
async function register(userName, password) {
  // await mongoose.connect(url_ibrahim);
  const user = new User({ userName, password });
  let verify = 'yes';
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
    res.render('home', { ok: verify });
  });
});
/* GET registration page */
router.get('/', (req, res, next) => {
  res.render('registration');
});

module.exports = router;
