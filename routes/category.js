const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router({ mergeParams: true });
const Category = require('../database/categoryModel');
const { authUser } = require('../utilities/auth');

router.get('/', authUser, function (req, res) {
  Category.find({ _id: req.params.category }, function (err, categories) {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    } else {
      const requestedCategory = categories[0];
      res.render('category', { category: requestedCategory });
    }
  });
});

module.exports = router;
