const express = require('express');
const { StatusCodes } = require('http-status-codes');
const Cart = require('../database/cartModel');
const Product = require('../database/productModel');
const { authUser } = require('../utilities/auth');

const router = express.Router({ mergeParams: true });

async function removeProductFromCart(userName, productId) {
  const cart = await Cart.findOne({ userName });
  cart.products.forEach((product, index) => {
    if (product.product === productId) {
      cart.products.splice(index, 1);
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
router.get('/', authUser, (req, res) => {
  const { userName } = req.session;
  getUserCart(userName, res);
});

router.post('/', async (req, res) => {
  const { userName } = req.session;
  const productId = req.params.product;
  await removeProductFromCart(userName, productId);
  res.redirect('/cart');
});

module.exports = router;
