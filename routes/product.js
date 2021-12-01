const express = require('express');
const router = express.Router({ mergeParams: true });
const Product = require('../database/productModel');
const Cart = require('../database/cartModel');

async function addToCart (userName, productId){
  Cart.findOne({userName : userName}, function(err, cart){
    let exist = cart.products.some(product => {return product.product === productId})
    if(exist){
      cart.products.find ((product, index) => {
        if (product.product === productId){
          cart.products[index] = {product : product.product, quantity : product.quantity+1}
        }
      })
    }
    else {
      cart.products.push({product : productId , quantity  : 1})
    }
    cart.save();
  })
}

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
  const productId = req.body.product
  const userName = req.session.userName
  addToCart(userName, productId)
});

module.exports = router;
