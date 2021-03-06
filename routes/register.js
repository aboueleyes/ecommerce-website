/* eslint-disable arrow-parens */
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../database/userModel');
const Cart = require('../database/cartModel');

async function register(userName, password) {
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
      const cart = new Cart({ userName: userName, products: [] });
      cart.save();
      req.session.userName = userName
      res.redirect('/');
    } else {
      res.render('registration', { ok: verify });
    }
  });
});
/* GET registration page */
router.get('/', (req, res, next) => {
  res.render('registration');
});

module.exports = router;
