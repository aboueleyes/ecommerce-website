const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();
const Product = require('../database/productModel');

function scapeNonAlphanumeric(str) {
  return str
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '\\$&')
    .trim();
}
// search route
router.post('/', (req, res) => {
  console.log(req.body);
  const searchTerm = scapeNonAlphanumeric(req.body.searchTerm);
  console.log(searchTerm);
  if (searchTerm === '') {
    res.redirect('/');
  } else {
    Product.find(
      { name: { $regex: `${searchTerm}`, $options: 'i' } },
      function (err, products) {
        if (err) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
        } else {
          console.log(products);
          res.render('searchresults', { results: products });
        }
      }
    );
  }
});

module.exports = router;
