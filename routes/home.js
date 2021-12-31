const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
const defaultData = require('../database/defaultData');
const Category = require('../database/categoryModel');
const { authUser } = require('../utilities/auth');

router.get('/', authUser, function (req, res) {
  const userName = req.session.userName;
  Category.find({}, (err, categories) => {
    if (err) {
      res.status(StatusCodes.NOT_FOUND).send(err);
    } else {
      if (categories.length === 0) {
        defaultData.getDefaultData();
        res.redirect('/');
      } else {
        res.render('home', { categories: categories, userName: userName });
      }
    }
  });
});

module.exports = router;
