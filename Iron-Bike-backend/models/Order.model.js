const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
    cartId:{type: Schema.Types.ObjectId, ref:'Cart'},
    userId:{type: Schema.Types.ObjectId, ref:'User'},
    status:{type:String, default:'PENDING', require:true},
    fullname:{type:String, require:true},
    address:{
        streetNumber: { type: String },
        streetName: { type: String, require:true},
        postalCode: { type: String, require:true },
        city: { type: String, require:true},
        country: { type: String, require:true }
    },
    totalAmount:Number,
    delivered:{default:false}
  },
  {timestamps:true}
  );

const Order = model("Order", cartItemSchema);

module.exports = Order;
