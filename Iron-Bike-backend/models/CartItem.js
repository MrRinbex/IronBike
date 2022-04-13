const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema({
    cartId:{type: Schema.Types.ObjectId, ref:'Cart'},
    quantity: {type: Number, defautl:1, require:true},
    unitPrice: {type: Number, require:true},
    totalPrice: {type: Number,
    default: function() {
      return this.unitPrice * this.quantity
    }}
  });

const CartItem = model("CartItem", cartItemSchema);

module.exports = CartItem;
