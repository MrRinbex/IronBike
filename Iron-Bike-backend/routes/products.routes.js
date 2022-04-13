const router = require("express").Router();
const mongoose = require("mongoose");
const {Products} = require("../models/Products.model");

//  POST /api/Products  -  Creates a new Product
router.post("/create", async (req, res, next) => {
  const {
    productName,
    brand,
    color,
    quantity,
    category,
    Characteristics,
    weight,
    size,
    image,
    price,
  } = req.body;

  try {
    const response = await Products.create({
      productName,
      brand,
      color,
      quantity,
      category,
      Characteristics,
      weight,
      size,
      image,
      price,
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({message:'internal error'});
  }
});
//  POST /api/Products  -  Find Products

router.get("/list", async (req, res, next) => {
  try {
    const products = await Products.find()
    res.json(products);
  } catch (err) {
    console.log(err, 'ERRROER')
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

    const products = await Products.findByIdAndUpdate(productsId, req.body, {
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

    await Brand.findByIdAndRemove(productsId);

    res.status(204).send();
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;