const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name can not be empty']
  },
  description: String,
  imageSrc: String,
  videoLink: String
});
module.exports = mongoose.model('Product', productSchema);
