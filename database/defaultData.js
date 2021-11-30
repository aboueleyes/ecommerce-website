const Product = require('./productModel');
const Category = require('./categoryModel');

const product1 = new Product({
  name: 'Boxing Bag',
  description:
    'Three-Station Heavy Duty Punching Bag Stand by Everlast, 54.00 x 54.00 x 84.00 Inches.',
  imageSrc: 'images/boxing.jpg',
  videoLink: ''
});

const product2 = new Product({
  name: 'Tennis Racket',
  description:
    '2021 New Professional-grade Wilson 1Pc Hend Carbon Fiber Tennis Racket.',
  imageSrc: 'images/tennis.jpg',
  videoLink: ''
});

const Category1 = new Category({
  name: 'Sports',
  imageSrc: 'images/sports.png',
  products: [product1, product2]
});

const Category2 = new Category({
  name: 'Books',
  imageSrc: 'images/books.png',
  products: [product1, product2]
});

const Category3 = new Category({
  name: 'Phones',
  imageSrc: 'images/phones.png',
  products: [product1, product2]
});

exports.getDefaultData = function () {
  Product.find({}, (err, products) => {
    if (err) {
      console.log(err);
    } else {
      product1.save();
      product2.save();
    }
  });

  Category.find({}, (err, categories) => {
    if (err) {
      console.log(err);
    } else {
      Category1.save();
      Category2.save();
      Category3.save();
    }
  });
};
