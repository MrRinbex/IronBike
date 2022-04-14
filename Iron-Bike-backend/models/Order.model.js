const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    cartId: { type: Schema.Types.ObjectId, ref: "Cart" },
    paymentStatus: { type: String, default: "PENDING", require: true },
    totalItems: Number,
    totalAmount: Number,
    type: String,
    shipTo: {
        fullname: { type: String, require: true },
        address: {
            streetNumber: { type: String },
            streetName: { type: String, require: true },
            postalCode: { type: String, require: true },
            city: { type: String, require: true },
            country: { type: String, require: true },
        },
    },
    orderStatus: {
      enum: ["process", "shipped", "delivered", "canceled", "refund"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", cartItemSchema);

module.exports = Order;
