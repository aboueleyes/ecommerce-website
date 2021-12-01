const express = require('express');
const router = express.Router({ mergeParams: true });
const Category = require('../database/categoryModel');

router.get('/', function (req, res) {
  Category.find({ _id: req.params.category }, function (err, categories) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('category', { category: categories[0] });
    }
  });
});

module.exports = router;
