const { Schema, model } = require("mongoose");

const brandSchema = new Schema(
  {
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
      }
  }
);

const Brand = model("Brand", brandSchema);

module.exports = Brand;
