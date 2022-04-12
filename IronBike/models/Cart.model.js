const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    products: [
      {
        bike: {
          bikeId: {
            type: String,
            quantity: {
              type: Number,
              default: 1,
            },
          },
        },
        accessories: {
          accessoriesId: {
            type: String,
            quantity: {
              type: Number,
              default: 1,
            },
          },
        },
        electricAccessories: {
          electricAccessoriesId: {
            type: String,
            quantity: {
              type: Number,
              default: 1,
            },
          },
        },
        clothes: {
          clothesId: {
            type: String,
            quantity: {
              type: Number,
              default: 1,
            },
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
