const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../database/userModel');

const router = express.Router();

router.post('/', (req, res, next) => {
  const userName = req.body.username;
  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  let verify = 'no';
  // check if user exists in database
  User.findOne({ userName }, (err, user) => {
    if (err) {
      // console.log(err);
    } else if (user) {
      if (bcrypt.compareSync(password, hashedPassword)) {
        verify = 'yes';
      }
    }
    if (verify === 'yes') {
      res.render('home', { ok: verify });
    } else {
      res.render('login', { ok: 'no' });
    }
  });
});

module.exports = router;
