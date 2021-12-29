const express = require('express');
const router = express.Router();
const defaultData = require('../database/defaultData');
const Category = require('../database/categoryModel');

router.get('/', function (req, res) {
  if (!req.session.userName) {
      res.redirect('/login')
  }
  else {
    const userName = req.session.userName
    Category.find({}, (err, categories) => {
      if (err) {
        console.log(err);
      } else {
        if (categories.length === 0) {
          defaultData.getDefaultData();
          res.redirect('/');
        }
        res.render('home', { categories: categories, userName: userName });
      }
    });
  }
})

module.exports = router;
