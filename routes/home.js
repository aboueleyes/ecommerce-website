var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  var userName = req.query.userName
  res.render('home',{userName : userName});
});

module.exports = router;
