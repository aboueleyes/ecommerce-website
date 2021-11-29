var express = require('express');
var router = express.Router();
const User = require('../database/userModel');
const bcrypt = require('bcrypt');

router.post('/', function (req, res, next) {
  var userName = req.body.username;
  var password = req.body.password;
  var hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  var verify = 'no';
  // check if user exists in database
  User.findOne({ userName: userName }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        if (bcrypt.compareSync(password, hashedPassword)) {
          verify = 'yes';
        }
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
