const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    userId:{type: Schema.Types.ObjectId, ref:'User'},
    cartItems:[],
    voucher: String,
    discount: Number,
    totalPrice:{type:Number,require:true}
  });

const Cart = model("Cart", cartSchema);

module.exports = Cart;
