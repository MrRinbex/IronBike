const { Schema, model } = require("mongoose");

const bikeSchema = new Schema(
  {
    productName: {
      type: String,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Brand',
    },
    color: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    categoryBike: ["Road Bike","Mountain Bike","City Bike", "E-Bike", "Low Rider"],
    frameMaterials: ['aluminum', 'carbon', 'titanium'],
    equipment : ['Shimano', 'Campagnolo', 'Sram'],
    Weight :  Number,
    size : [ small, medium, large],
    image : String,
    price : Number,
    wishList: false,
  }
);

const Bike = model("Bike", bikeSchema);

module.exports = Bike;
