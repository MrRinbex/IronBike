const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/", async (req, res, next) => {
  try {
    console.log(req.payload, "payload");
    res.status(204).json({ message: "route /admin ok" });

    return;
  } catch (err) {
    console.log(err, "error");
    next(err);
  }
});

// à faire
//admin/create/product GET POST
router.post("/create/product", isAuthenticated, async (req, res, next) => {
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

//à faire
//admin/update/product POST
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

//à faire

//admin/delete/product DELETE
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
/**
/admin/dashboard : Receives, users, orders, products, 
/admin/create/user  POST
/admin/create/order POST
/admin/create/product POST
/admin/delete/user DELETE
/admin/delete/order DELETE
/admin/delete/product DELETE
/admin/update/user PUT
/admin/update/order PUT
/admin/update/product PUT
 */
module.exports = router;
