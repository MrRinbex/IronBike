const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productsId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamp: true }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
