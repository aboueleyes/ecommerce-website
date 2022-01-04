const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../database/userModel');
var router = express.Router();

/* POST to login page*/
router.post('/', function (req, res, next) {
  var userName = req.body.username;
  var password = req.body.password;
  var verify = 'no';
  // check if user exists in 

  User.findOne({ userName }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          verify = 'yes';
        }
      }
    }
    if (verify === 'yes') {
      req.session.userName = userName
      console.log(req.session.userName)
      console.log(req.session.id)
      console.log(res.session)
      res.redirect('/');

    }
    else {
      res.render('login', { ok: 'no' });
    }
  });
});

/* GET login page. */
router.get('/', function (req, res, next) {
  if (req.session.userName) {
    res.redirect('/');
  }
  else {
    res.render('login');
  }
});


module.exports = router;
