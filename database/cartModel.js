const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Cart must have a user']
  },
  products: [
    {
      product: String,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
