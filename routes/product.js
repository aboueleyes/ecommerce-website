const express = require('express');
const router = express.Router({ mergeParams: true });
const Product = require('../database/productModel');

router.get('/', function (req, res) {
  Product.find({ _id: req.params.product }, function (err, products) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('product', { product: products[0] });
    }
  });
});

router.post('/', function (req, res) {
  res.send(req.body);
});

module.exports = router;
