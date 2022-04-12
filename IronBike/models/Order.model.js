const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
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

const Order = model("Order", orderSchema);

module.exports = Order;
