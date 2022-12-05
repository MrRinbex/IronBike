const { Schema, model, mongoose } = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    image: { type: String, required: true },
    category: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    slug: { type: String, slug: "productName" },
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
    enum: ["Road Bike", "Mountain Bike", "City Bike", "E-Bike", "Kid Bike"],
  },
  frameMaterials: {
    type: String,
    enum: ["Aluminum", "Carbon", "Titanium"],
  },
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
    enum: ["Bars", "Gels", "Drinks", "Energy Meals"],
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
