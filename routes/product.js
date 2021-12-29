const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router({ mergeParams: true });
const Product = require('../database/productModel');
const Cart = require('../database/cartModel');

async function addToCart(req, userName, productId) {
  Cart.findOne({ userName: userName }, function (err, cart) {
    let exist = cart.products.some(product => {
      return product.product === productId;
    });
    if (exist) {
        console.log('product already exist');
        req.app.locals.display = 'block';
    } else {
      cart.products.push({ product: productId});
    }
    cart.save();
    console.log('product added to cart');
  });
}

router.get('/', function (req, res) {
  if (!req.session.userName) {
    res.redirect('/login');
  } else {
    renderProduct(req, res, 'none');
  }
});

router.post('/', async function (req, res) {
  const productId = req.params.product;
  const userName = req.session.userName;
  await addToCart(req, userName, productId);
  res.redirect('/');
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
