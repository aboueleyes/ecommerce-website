const express = require('express');
const router = express.Router({ mergeParams: true });
const Product = require('../database/productModel');

router.get('/', function (req, res) {
  Product.find({ name: req.params.product }, function (err, products) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('product', { product: products[0] });
    }
  });
});

module.exports = router;
