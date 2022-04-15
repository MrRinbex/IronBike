const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const { Product } = require("../models/Product.model");

//  POST /api/Products  -  Creates a new Product
router.post("/create", isAuthenticated, async (req, res, next) => {
  console.log(req.payload, "payload");
  const {
    productName,
    brand,
    color,
    quantity,
    categoryBike,
    frameMaterials,
    weight,
    size,
    image,
    price,
    equipment,
    modelYears,
  } = req.body;

  try {
    const response = await Product.create({
      productName,
      brand,
      color,
      quantity,
      categoryBike,
      frameMaterials,
      weight,
      size,
      image,
      price,
      equipment,
      modelYears,
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: "internal error" });
  }
});
//  POST /api/Products  -  Find Products

router.get("/list", async (req, res, next) => {
  try {
    const queryProductName = req.query.productName;

    let queryProducts;

    if (queryProductName) {
      console.log(queryProductName);
      queryProducts = await Product.find({
        productName: queryProductName,
      });
    } else {
      queryProducts = await Product.find();
    }
    res.json(queryProducts);
  } catch (err) {
    console.log(err, "ERROR");
    res.json(err);
  }
});

//  PUT /api/Products  -  Update Products

router.put("/update/:productsId", async (req, res, next) => {
  try {
    const { productsId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productsId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const products = await Product.findByIdAndUpdate(productsId, req.body, {
      new: true,
    });

    res.json(products);
  } catch (err) {
    res.json(err);
  }
});

//  DELETE /api/products  -  Delete products

router.delete("/delete/:productsId", async (req, res, next) => {
  try {
    const { productsId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productsId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    await Product.findByIdAndRemove(productsId);

    res.status(204).send();
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
