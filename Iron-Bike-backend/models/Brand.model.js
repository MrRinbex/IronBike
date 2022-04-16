const { Schema, model } = require("mongoose");

const brandSchema = new Schema({
  name: {
    type: String,
  },
  brandLogo: {
    type: String,
  },
  headquarters: {
    type: String,
  },
  madeIn: {
    type: String,
  },
  foundationYear: Number,
});

const Brand = model("Brand", brandSchema);

module.exports = Brand;
