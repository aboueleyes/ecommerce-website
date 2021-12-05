const express = require('express');
const { StatusCodes } = require('http-status-codes');
const Cart = require('../database/cartModel');
const Product = require('../database/productModel');

const router = express.Router({ mergeParams: true });

async function removeProductFromCart(userName, productId) {
  const cart = await Cart.findOne({ userName });
  cart.products.forEach((product, index) => {
    if (product.product === productId) {
      if (product.quantity === 1) {
        cart.products.splice(index, 1);
      } else {
        console.log(product.quantity);
        cart.products[index] = {
          product: product.product,
          quantity: product.quantity - 1
        };
      }
    }
  });
  await cart.save();
}
function getUserCart(userName, res) {
  Cart.findOne({ userName }, (err, cart) => {
    if (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    } else {
      const userProducts = cart.products;
      Promise.all(
        userProducts.map(userProduct =>
          Product.findOne({ _id: userProduct.product }).exec()
        )
      )
        .then(storedProducts => {
          res.render('cart', {
            userProducts,
            storedProducts
          });
        })
        .catch(err => {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
        });
    }
  });
}
router.get('/', (req, res) => {
  if (!req.session.userName) {
    res.redirect('/login');
  } else {
    const { userName } = req.session;
    getUserCart(userName, res);
  }
});

router.post('/', async (req, res) => {
  const { userName } = req.session;
  const productId = req.params.product;
  await removeProductFromCart(userName, productId);
  getUserCart(userName, res);
});

module.exports = router;
