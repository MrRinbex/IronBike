const router = require("express").Router();
const mongoose = require("mongoose");
const { populate } = require("../models/Brand.model");
const { Product } = require("../models/Product.model");

// GET PRODUCT By id or slug !
router.get("/:idOrSlug", async (req, res) => {
  const query = req.params.idOrSlug;
  try {
    if (mongoose.isValidObjectId(query)) {
      console.log("try by id");
      const product = await Product.findById(query).populate("brand");
      if (product === null) {
        const product = await Product.findOne({ slug: query }).populate(
          "brand"
        );
        res.status(200).json(product);
        return;
      }
      res.json(product);
    } else {
      console.log("try by slug");
      const product = await Product.findOne({ slug: query }).populate("brand");
      res.status(200).json(product);
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// GET ALL PRODUCTS, or by category or by query !

router.get("/", async (req, res) => {
  const query = req.query;
  try {
    let products;
    if (query.category) {
      products = await Product.find({ category: query.category });
    } else if (query.size) {
      products = await Product.find({ size: query.size });
    } else if (query.categoryBike) {
      products = await Product.find({ categoryBike: query.categoryBike });
    } else if (query.frameMaterials) {
      products = await Product.find({ frameMaterials: query.frameMaterials });
    } else if (query.features) {
      products = await Product.find({ features: query.features });
    } else if (query.aspect) {
      products = await Product.find({ aspect: query.aspect });
    } else if (query.flavor) {
      products = await Product.find({ flavor: query.flavor });
    } else if (query.vegan) {
      products = await Product.find({ vegan: query.vegan });
    } else if (query.sexCategory) {
      products = await Product.find({ sexCategory: query.sexCategory });
    } else if (query.type) {
      products = await Product.find({ type: query.type });
    } else if (query.productName) {
      products = await Product.find({ productName: query.productName });
    } else if (query.color) {
      products = await Product.find({ color: query.color });
    } else if (Object.keys(query).length > 0) {
      products = await Product.find(query)
        .populate("brand")
        .sort({ createdAt: -1 });
    } else {
      products = await Product.find().populate("brand").sort({ createdAt: -1 });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
