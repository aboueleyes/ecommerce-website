const express = require('express');
const router = express.Router({ mergeParams: true });
const defaultData = require('../database/defaultData');
const Category = require('../database/categoryModel');

const categories = [
  {
    name: 'sports',
    products: [
      {
        name: 'Boxing bag',
        image_src: 'images/boxing.jpg'
      },
      {
        name: 'Tennis Racket',
        image_src: 'images/tennis.jpg'
      }
    ]
  }
];

router.get('/', function (req, res) {
  Category.find({ name: req.params.category }, function (err, categories) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('category', { category: categories[0] });
      // res.send(categories[0]);
    }
  });
});

module.exports = router;
