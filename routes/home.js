const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
const defaultData = require('../database/defaultData');
const Category = require('../database/categoryModel');

router.get('/', function (req, res) {
  if (!req.session.userName) {
    res.redirect('/login');
  } else {
    var userName = req.session.userName;
    Category.find({}, (err, categories) => {
      if (err) {
        res.status(StatusCodes.NOT_FOUND).send(err)
      } else {
        if (categories.length === 0) {
          defaultData.getDefaultData();
          res.redirect('/');
        }
        res.render('home', { categories: categories, userName: userName });
      }
    });
  }
});

module.exports = router;
