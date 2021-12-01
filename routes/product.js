const express = require('express');
const router = express.Router({ mergeParams: true });
const Product = require('../database/productModel');
const Cart = require('../database/cartModel');

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
  Cart.findOne({ userName: req.session.userName }, function (err, cart) {
    res.send(cart + req.body.product);
  });
});

module.exports = router;
