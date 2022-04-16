const router = require("express").Router();
const mongoose = require("mongoose");
const Brand = require("../models/Brand.model");

//  POST /api/brand  -  Creates a new brand
router.post("/create", async (req, res, next) => {
  const { name, brandLogo, headquarters, madeIn } = req.body;

  try {
    const response = await Brand.create({
      name,
      brandLogo,
      headquarters,
      madeIn,
    });
    res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again" });
    return;
  }
});
//  POST /api/brand  -  Find brand

router.get("/list", async (req, res, next) => {
  try {
    const brand = await Brand.find();
    res.json(brand);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again" });
    return;
  }
});

//  PUT /api/brand  -  Update brand

router.put("/update/:brandId", async (req, res, next) => {
  try {
    const { brandId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const brand = await Brand.findByIdAndUpdate(brandId, req.body, {
      new: true,
    });

    res.json(brand);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again" });
    return;
  }
});

//  DELETE /api/brand  -  Delete brand

router.delete("/delete/:brandId", async (req, res, next) => {
  try {
    const { brandId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    await Brand.findByIdAndRemove(brandId);

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again" });
    return;
  }
});

module.exports = router;
