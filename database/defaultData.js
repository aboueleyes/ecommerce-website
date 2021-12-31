const Product = require('./productModel');
const Category = require('./categoryModel');

const boxingBag = new Product({
  name: 'Boxing Bag',
  description:
    'Three-Station Heavy Duty Punching Bag Stand by Everlast, 54.00 x 54.00 x 84.00 Inches.',
  imageSrc: 'images/boxing.jpg',
  videoLink: 'https://www.youtube.com/embed/vY1kB6uEu9c'
});

const tennisRacket = new Product({
  name: 'Tennis Racket',
  description:
    '2021 New Professional-grade Wilson 1Pc Hend Carbon Fiber Tennis Racket.',
  imageSrc: 'images/tennis.jpg',
  videoLink: 'https://www.ispot.tv/share/O7dL'
});

const galaxy = new Product({
  name: 'Galaxy S21 Ultra',
  description: `The Galaxy S21 has a design similar to 
  its predecessor, with an Infinity-O display containing a circular cutout in
   the top center for the front selfie camera. The S21's back panel is 
   reinforced poly-carbonate similar to the S20 FE and Note 20, while the S21+ 
   and S21 Ultra use glass.[8] The rear camera array has been integrated into the 
   phone body and has a metallic surround; the S21 Ultra has 
   a carbon fiber camera surround for exclusive colors.`,
  imageSrc: 'images/galaxy.jpg',
  videoLink: 'https://www.youtube.com/embed/kYPHTSEU49Y'
});

const leaves = new Product({
  name: 'Leaves of Grass',
  description: `A poetry collection by American poet Walt Whitman (1819–1892), 
  each poem of which is loosely connected and represents the 
  celebration of his philosophy of life and humanity.`,
  imageSrc: 'images/leaves.jpg',
  videoLink: 'https://www.youtube.com/embed/Zm3nhUjZPuA'
});

const iphone = new Product({
  name: 'iPhone 13 Pro',
  description: `The iPhone 13 Pro and iPhone 13 Pro Max are smartphones 
  designed and marketed by Apple Inc. They are the flagship smartphones
   in the fifteenth generation of the iPhone, succeeding 
   the iPhone 12 Pro and iPhone 12 Pro Max.`,
  imageSrc: 'images/iphone.jpg',
  videoLink: 'https://www.youtube.com/embed/XKfgdkcIUxw'
});

const sun = new Product({
  name: 'The Sun and Her Flowers',
  description: `From Rupi Kaur, the #1 New York Times bestselling 
  author of milk and honey, comes her long-awaited second collection of
   poetry. A vibrant and transcendent journey about growth and healing. 
   Ancestry and honoring one’s roots. Expatriation and rising 
   up to find a home within yourself.`,
  imageSrc: 'images/sun.jpg',
  videoLink: 'https://www.youtube.com/embed/FXbaFwDfziQ'
});

const sports = new Category({
  name: 'Sports',
  imageSrc: 'images/sports.png',
  products: [boxingBag, tennisRacket]
});

const books = new Category({
  name: 'Books',
  imageSrc: 'images/books.png',
  products: [leaves, sun]
});

const phones = new Category({
  name: 'Phones',
  imageSrc: 'images/phones.png',
  products: [galaxy, iphone]
});

exports.getDefaultData = function () {
  Product.find({}, (err, products) => {
    if (err) {
      console.log(err);
    } else {
      boxingBag.save();
      tennisRacket.save();
      leaves.save();
      sun.save();
      iphone.save();
      galaxy.save();
    }
  });

  Category.find({}, (err, categories) => {
    if (err) {
      console.log(err);
    } else {
      sports.save();
      phones.save();
      books.save();
    }
  });
};
