const router = require("express").Router();
const mongoose = require("mongoose");
const { Product } = require("../models/Product.model");

// GET PRODUCT By id or slug !
router.get("/:idOrSlug", async (req, res) => {
  const query = req.params.idOrSlug;

  try {
    const product = await Product.find({
      $or: [{ _id: query }, { slug: query }],
    });
    res.status(200).json(product);
  } catch (e) {
    if (e.kind === "ObjectI") {
      const product = await Product.find({ slug: query });
      res.status(200).json(product);
    } else {
      res.status(500).json(e);
    }
  }
});

// GET ALL PRODUCTS, or by categeory or by query !
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    let products;
    if (query.category) {
      products = await Product.find({ category: query.category });
    } else if (Object.keys(query).length > 0) {
      products = await Product.find(query).sort({ createdAt: -1 });
    } else {
      products = await Product.find().sort({ createdAt: -1 });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
