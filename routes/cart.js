const express = require('express');
const router = express.Router();
const Cart = require('../database/cartModel');
const Product = require('../database/productModel');

router.get('/', function (req, res) {
  if (!req.session.userName) {
    res.redirect('/login');
  }
  else {
    const userName = req.session.userName;
    Cart.findOne({ userName: userName }, (err, cart) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
        const userProducts = cart.products;
        Promise.all(userProducts.map((userProduct) => {
          return Product.findOne({ _id: userProduct.product }).exec();
        })).then((storedProducts) => {
          res.render('cart', { userProducts: userProducts, storedProducts: storedProducts });
        }).catch((err) => {
          res.status(500).send(err);
        })
      }
    });
  }
});

module.exports = router;
