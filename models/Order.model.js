const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required:true},
    paymentStatus: { type: String, default: "PENDING"},
    products:[
      {
        products:{
          type:String
        },
        quantity:{
          type:Number,
          default:1,
        }
      }
    ],
    totalItems: Number,
    amount:{type:Number, required:true},
    voucher:String,
    discount:Number,
    amountToPay: {type:Number, required:true},
    address: { type: Object },
    orderStatus: {
      enum: ["process", "shipped", "delivered", "canceled", "refund"],
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.methods.setAmountToPay = function(){
  return this.amount - this.discount
}

const Order = model("Order", orderSchema);

module.exports = Order;
