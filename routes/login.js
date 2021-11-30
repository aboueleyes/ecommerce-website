var express = require('express');
var router = express.Router();
const User = require('../database/userModel');
const bcrypt = require('bcrypt');

/* POST to login page*/ 
router.post('/', function (req, res, next) {
  var userName = req.body.username;
  var password = req.body.password;
  var verify = 'no';
  // check if user exists in database
  User.findOne({ userName: userName }, (err, user) => {
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
      res.redirect('/home?userName='+userName);
    } else {
      res.render('login', { ok: 'no' });
    }
  });
});

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login');
});


module.exports = router;
