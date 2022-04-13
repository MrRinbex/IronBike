const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userID: {
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

const Cart = model("Cart", cartSchema);

module.exports = Cart;
