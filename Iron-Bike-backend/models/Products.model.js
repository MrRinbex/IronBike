const { Schema, model } = require("mongoose");

const productsSchema = new Schema({
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
  price: Number,
});

const Products = model("Products", productsSchema);

const bikeSchema = new Schema({
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
  equipment: {
    type: String,
    enum: ["Shimano", "Campagnolo", "Sram"],
  },
  color: {
    type: String,
  },
  weight: Number,
  modelYears: Number,
});

const Bike = Products.discriminator("Bike", bikeSchema);

const accessoriesSchema = new Schema({
  features: {
    type: String,
    enum: ["GPS", "Bluetooth", "Heart Rate Monitor", "Wireless"],
  },
});

const Accessories = Products.discriminator("Accessories", accessoriesSchema);

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
    type: Boolean,
    default: false,
  },
  weight: Number,
});
const Nutrition = Products.discriminator("Nutrition", nutritionSchema);

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
    enum: ["yes", "None"],
  },
  rainProtection: {
    type: String,
    enum: ["yes", "None"],
  },
  color: {
    type: String,
  },
});
const Clothes = Products.discriminator("Clothes", clothesSchema);

module.exports = { Products, Bike, Accessories, Nutrition, Clothes };
