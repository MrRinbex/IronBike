const { Schema, model } = require("mongoose");

const ClothesSchema = new Schema({
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
  sexType: ["Men", "Women", "Children"],
  type: ["Helmets", "Jerseys", "Trousers", "Shoes", "Glasses"],
  size: ["small", "medium", "large"],
});

const Clothes = model("Clothes", ClothesSchema);

module.exports = Clothes;
