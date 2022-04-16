const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGODB_URI;
const Brand = require("../../models/brand.model");
const { Product, Bike } = require("../../models/Product.model");
const { faker } = require("@faker-js/faker");

mongoose
  .connect(MONGO_URI)
  .then(async (x) => {
    console.log(
      `Connected to Mongo IronBike! Database name: '${x.connections[0].name}'`
    );
    await seedDB();
    await mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const nutritions = [
  {
    productName: "Bcaa",
    quantity: 300,
    price: 11,
    aspect: "Energy Meals",
    flavor: "Chocolate",
    toTake: "Before Training",
    vegan: "Yes",
    weight: 0.5,
  },
  {
    productName: "Carbo Protein",
    quantity: 100,
    price: 43,
    aspect: "Bars",
    flavor: "Cookies",
    toTake: "After Training",
    vegan: "None",
    weight: 0.8,
  },
];
const brands = [
  {
    name: "Shimano",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1649861921/Products/Brand/Shimano.svg_uearaw.png",
    headquarters: "Japan",
    madeIn: "Japan",
  },
  {
    name: "Willier Triestina",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1649861921/Products/Brand/Wilier_triestina_logo_gvptdy.png",
    headquarters: "Italy",
    madeIn: "Italy",
  },
  {
    name: "Pinarello",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1649861921/Products/Brand/Pinarello_logo.svg_pdyfmc.png",
    headquarters: "Italy",
    madeIn: "Italy",
  },
  {
    name: "Isostar",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1649861921/Products/Brand/Isostar_logo.svg_aktlsc.png",
    headquarters: "France",
    madeIn: "France",
  },
  { name: "Trek", brandLogo: "", headquarters: "", madeIn: "" },
  { name: "Red Bull", brandLogo: "", headquarters: "", madeIn: "" },
  { name: "Cannondale", brandLogo: "", headquarters: "", madeIn: "" },
  { name: "Giant", brandLogo: "", headquarters: "", madeIn: "" },
  { name: "Specialized", brandLogo: "", headquarters: "", madeIn: "" },
  { name: "Canyon", brandLogo: "", headquarters: "", madeIn: "" },
  { name: "YT", brandLogo: "", headquarters: "", madeIn: "" },
  { name: "Fuji", brandLogo: "", headquarters: "", madeIn: "" },
  { name: "GT", brandLogo: "", headquarters: "", madeIn: "" },
  { name: "Campagnolo", brandLogo: "", headquarters: "", madeIn: "" },
  { name: "Sram", brandLogo: "", headquarters: "", madeIn: "" },
];
const bikeCats = [
  "Road Bike",
  "Mountain Bike",
  "City Bike",
  "E-Bike",
  "Low Rider",
];
const size = ["S", "M", "L"];

const frameMaterials = ["aluminum", "carbon", "titanium"];
//
function getOneBikeCat(bikeCats) {
  let catBike = bikeCats[Math.floor(Math.random() * bikeCats.length)];
  return catBike;
}

function getOneBrand(brands) {
  let brand = brands[Math.floor(Math.random() * brands.length)].name;
  return brand;
}

// choose a quantity when we call the function
async function generateFakeBikes(quantity) {
  const fakeBikes = [];
  for (let i = 0; i < quantity; i++) {
    const bikename = faker.vehicle.bicycle();
    // const theBrand = await arrayOfBrandsIDs[Math.floor(Math.random() * 20)];
    // let number = "";
    // const theBrand = await arrayOfBrandsIDs[0];
    // console.log(theBrand, "THE BRAND OF THIS BIKE");

    let bike = {
      productName: `${bikename} ${i}`,

      quantity: Math.floor(Math.random() * 20),
      image: "https://picsum.photos/300/300",
      price: faker.commerce.price(200, 4000),
      bikeBrand: getOneBrand(brands),
      categoryBike: await getOneBikeCat(bikeCats),
      size: size[Math.floor(Math.random() * size.length)],
      frameMaterials:
        frameMaterials[Math.floor(Math.random() * frameMaterials.length)],
      color: faker.commerce.color(),
      weight: faker.datatype.number({ min: 1, max: 25, precision: 0.01 }),
      modelYears: faker.datatype.number({ min: 1997, max: 2022 }),
    };
    fakeBikes.push(bike);
    console.log(bike, "a été crée");
  }
  return fakeBikes;
}

async function getBrandsIdFromDB(allBrandsArrayFromDB) {
  const brandsID = [];
  for (let i = 0; i < allBrandsArrayFromDB.length; i++) {
    brandsID.push({
      id: allBrandsArrayFromDB[i]._id,
      name: allBrandsArrayFromDB[i].name,
    });
  }
  return brandsID;
}

async function seedDB() {
  try {
    await Brand.deleteMany();
    await Product.deleteMany({ __t: "Bike" });
    // await User.deleteMany();
    // await Product.deleteMany();
    // await Cart.deleteMany();
    // await Order.deleteMany();

    const brandsDB = await Brand.create(brands);
    const allBrands = await Brand.find();
    // console.log(allBrands, " - ALL BRANDS !");
    //
    const brandsIdFromDB = await getBrandsIdFromDB(allBrands);
    console.log(brandsIdFromDB, "les BRANDS ID");
    //

    const fakeBikes = await generateFakeBikes(100);
    console.log(fakeBikes, " - FAKE BIKE !");
    const allBikes = await Bike.create(fakeBikes);
    console.log(allBikes.productName, "This Bikes name from db");
    // await Nutrition.create(nutritions);
  } catch (err) {
    console.log(`An error occurred while creating DATA from the DB: ${err}`);
  }
}
