const connection = require("../index");
const { default: mongoose } = require("mongoose");
const {
  Product,
  Bike,
  Accessory,
  Nutrition,
  Clothes,
} = require("../../models/Product.model");
const Brand = require("../../models/Brand.model");

const bikes = [
  {
    productName: "WILIER TRIESTINA ZERO",
    quantity: 5,
    price: 7025,
    category:"Bikes",
    categoryBike: "Road Bike",
    size: "M",
    frameMaterials: "carbon",
    equipment: "Campagnolo",
    color: "Grey, Blue",
    weight: 8.37,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846501/Products/Bike/Road%20Bike/Wilier_0_SL_Disc_Chorus_2x12_grau_blau_600x600_vrnca6.jpg",
    modelYears: 2022,
  },
  {
    productName: "FOCUS Jam",
    quantity: 3,
    price: 8325,
    category:"Bikes",
    categoryBike: "Mountain Bike",
    size: "L",
    frameMaterials: "titanium",
    equipment: "Campagnolo",
    color: "white",
    weight: 11,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649969273/Products/Bike/MTB/FOCUS_Jam_6_8_wei__grau_600x600_kclqtz.jpg",
    modelYears: 2020,
  },
];

const nutritions = [
  {
    productName: "ISOSTAR POWER TABS Energy Drink",
    quantity: 300,
    price: 11,
    category:"Nutrition",
    aspect: "Energy Meals",
    flavor: "Lemon",
    toTake: "Before Training",
    vegan: "Yes",
    weight: 0.5,
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649846405/Products/Nutrition/Drinks/ISOSTAR_POWERTABS_Energy_Drink_Tube_of_10_Tabs_of_12_g_q0mznx.jpg",
  },
  {
    productName: "STC CARBO PROTEIN",
    quantity: 100,
    price: 43,
    category:"Nutrition",
    aspect: "Bars",
    flavor: "Cookies",
    toTake: "After Training",
    vegan: "Yes",
    weight: 4.8,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846404/Products/Nutrition/Drinks/STC_NUTRITION_VEGETAL_PROTEIN_Recovery_Drink_750_g_oqjwvm.jpg",
  },
];


const createProducts = async (req, res, next) => {
  await Product.deleteMany();

  const willierBrand = await Brand.findOne({ name: "Willier Triestina" });
  bikes[0].brand = willierBrand._id;

  await Bike.create(bikes);


  const isostarBrand = await Brand.findOne({ name: "Isostar" });
  nutritions[0].brand = isostarBrand._id;

  await Nutrition.create(nutritions);

  const products = await Product.find();
  console.log(products);
};

const perform = async () => {
  await connection;
  await createProducts();
  await mongoose.connection.close();
};
perform();
