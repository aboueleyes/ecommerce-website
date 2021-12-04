const express = require("express");
const router = express.Router();
const Product = require("../database/productModel");

// search route
router.post("/", (req, res) => {
  const searchTerm = req.body.searchTerm;

  if (searchTerm === "") {
    res.redirect("/");
  } else {
    Product.find(
      { name: { $regex: `${searchTerm}`, $options: "i" } },
      function (err, products) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.render("searchresults", { results: products });
        }
      }
    );
  }
});

module.exports = router;
