const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router({ mergeParams: true });
const Product = require('../database/productModel');
const Cart = require('../database/cartModel');

async function addToCart(userName, productId) {
  Cart.findOne({ userName: userName }, function (err, cart) {
    let exist = cart.products.some(product => {
      return product.product === productId;
    });
    if (exist) {
      cart.products.forEach((product, index) => {
        if (product.product === productId) {
          cart.products[index] = {
            product: product.product,
            quantity: product.quantity + 1
          };
        }
      });
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    cart.save();
  });
}

router.get('/', function (req, res) {
  if (!req.session.userName) {
    res.redirect('/login');
  } else {
    renderProduct(req, res);
  }
});

router.post('/', function (req, res) {
  const productId = req.params.product;
  const userName = req.session.userName;
  addToCart(userName, productId);
  renderProduct(req, res);
});

function renderProduct(req, res) {
  Product.find({ _id: req.params.product }, function (err, products) {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    } else {
      const requestedProduct = products[0];
      res.render('product', { product: requestedProduct });
    }
  });
}

module.exports = router;
