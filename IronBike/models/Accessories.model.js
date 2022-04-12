const { Schema, model } = require("mongoose");

const AccessoriesSchema = new Schema({
  productName: {
    type: String,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  brandLogo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  madeIn: {
    type: String,
  },
  wishList: false,
});

const Accessories = model("Accessories", AccessoriesSchema);

module.exports = Accessories;
