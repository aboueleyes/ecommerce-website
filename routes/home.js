const express = require('express');
const router = express.Router();
const defaultData = require('../database/defaultData');

defaultData.getDefaultDataIfDBEmpty();

const categories = [
  {
    name: 'sports',
    image_src: 'images/sports.png'
  },
  {
    name: 'books',
    image_src: 'images/books.png'
  },
  {
    name: 'phones',
    image_src: 'images/phones.png'
  }
];

router.get('/', function (req, res) {
  res.render('home', { categories: categories });
});

module.exports = router;
