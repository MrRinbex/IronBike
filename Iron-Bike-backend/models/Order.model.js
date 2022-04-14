const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    paymentStatus: { type: String, default: "PENDING" },
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
    totalItems: Number,
    amount: { type: Number, required: true },
    voucher: String,
    discount: Number,
    amountToPay: { type: Number, required: true },
    address: { type: Object, required: true },
    orderStatus: {
      enum: ["process", "shipped", "delivered", "canceled", "refund"],
    },
  },
  {
    timestamps: true,
  }
);

ordertSchema.methods.getAmountToPay = () => this.amount - this.discount;

const Order = model("Order", cartItemSchema);

module.exports = Order;
