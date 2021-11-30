const mongoose = require('mongoose');
const Product = require('./productModel');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name can not be empty']
  },
  imageSrc: String,
  products: [Product.schema]
});
module.exports = mongoose.model('Category', categorySchema);
