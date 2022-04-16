const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    quantity: {
      type: Number,
    },
    image: String,
    price: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

const bikeSchema = new Schema({
  bikeBrand: String,
  categoryBike: {
    type: String,
    enum: ["Road Bike", "Mountain Bike", "City Bike", "E-Bike", "Low Rider"],
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
  frameMaterials: {
    type: String,
    enum: ["aluminum", "carbon", "titanium"],
  },
  // equipment: {
  //   type: String,
  //   enum: ["Shimano", "Campagnolo", "Sram"],
  // },
  color: {
    type: String,
  },
  weight: Number,
  modelYears: Number,
});

const Bike = Product.discriminator("Bike", bikeSchema);

const accessorySchema = new Schema({
  features: {
    type: String,
    enum: ["GPS", "Bluetooth", "Heart Rate Monitor", "Wireless"],
  },
});

const Accessory = Product.discriminator("Accessory", accessorySchema);

const nutritionSchema = new Schema({
  aspect: {
    type: String,
    enum: ["Bars", "Gels", "Drinks", "Energy Meals", "Food Supplements"],
  },
  flavor: {
    type: String,
  },
  toTake: {
    type: String,
    enum: ["Before Training", "During Training", "After Training"],
  },
  vegan: {
    type: String,
    enum: ["Yes", "None"],
  },
  weight: Number,
});
const Nutrition = Product.discriminator("Nutrition", nutritionSchema);

const clothesSchema = new Schema({
  sexCategory: {
    type: String,
    enum: ["Men", "Women", "Children"],
  },
  type: {
    type: String,
    enum: ["Helmets", "Jerseys", "Trousers", "Shoes", "Glasses"],
  },
  size: {
    type: String,
    enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
  },
  ReflectiveEquipment: {
    type: String,
    enum: ["Yes", "None"],
  },
  rainProtection: {
    type: String,
    enum: ["Yes", "None"],
  },
  color: {
    type: String,
  },
});
const Clothes = Product.discriminator("Clothes", clothesSchema);

module.exports = { Product, Bike, Accessory, Nutrition, Clothes };
