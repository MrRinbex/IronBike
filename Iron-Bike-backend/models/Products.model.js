const { Schema, model } = require("mongoose");

const productsSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brand: {
        type: Schema.Types.ObjectId, 
        ref: 'Brand',
    },
    color: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    category: {
        type: String,
        enum: ["Road Bike","Mountain Bike","City Bike", "E-Bike", "Low Rider", "E-Accessories", "Accessories", "Helmets", "Glasses", "Jerseys", "Trousers", "Shoes","Nutrition"],
    },
    Characteristics :{
        type: String,
    },
    weight :  Number,
    size : {
        type: String,
        enum: [ "XXS", "XS", "S", "M", "L", "XL", "XXL"],
    },
    image : String,
    price : Number,
  }
);

const Products = model("Products", productsSchema);

module.exports = Products;
  
