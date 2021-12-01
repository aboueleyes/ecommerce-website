const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  if (!req.session.userName) {
    res.redirect('/login');
  } else {
    res.render('cart');
  }
});

module.exports = router;
