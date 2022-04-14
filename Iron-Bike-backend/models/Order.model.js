const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    cartId: { type: Schema.Types.ObjectId, ref: "Cart" },
    paymentStatus: { type: String, default: "PENDING", require: true },
    totalItems: Number,
    totalAmount: Number,
    address: { type: Object },
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
