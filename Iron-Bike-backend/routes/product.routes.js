const router = require("express").Router();
const mongoose = require("mongoose");
const { Product, Bike, Nutrition, Brand } = require("../models/Product.model");

/**
 * /category-name/product-name GET
 */

//  POST /api/Products  -  Find Products

router.get("/", async (req, res, next) => {
  try {
    const query = req.query;

    
    let queryProducts;
    const queryArray = Object.entries(query).map((e) => ({ [e[0]]: e[1] }));
    
    console.log(queryArray, "QUERY ARRAY");

    if (queryArray.length === 1) {
      // console.log("Appel 1");
      queryProducts = await Product.find(queryArray[0]);
    } else if (queryArray.length > 1) {
      queryProducts = await Product.find({ $and: queryArray });
      // console.log("APPEL 2");
      console.log(queryProducts, "FILTER");
    } else {
      // console.log("APPEL 3");
      queryProducts = await Product.find();
    }
    res.json(queryProducts);
  } catch (err) {
    console.log(err, "ERROR");
    res.json(err);
  }
});

module.exports = router;
