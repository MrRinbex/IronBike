const { Schema, model } = require("mongoose");

const electricAccessoriesSchema = new Schema({
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
  Price: {
    type: Number,
  },
  madeIn: {
    type: String,
  },
  features: ["GPS", "Bluetooth", "Heart Rate Monitor", "Wireless"],
  wishList: false,
});

const ElectricAccessories = model(
  "ElectricAccessories",
  electricAccessoriesSchema
);

module.exports = ElectricAccessories;
