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
const { faker } = require("@faker-js/faker");

const bikes = [
  {
    productName: "WILIER TRIESTINA ZERO",
    quantity: 5,
    price: 7025,
    categoryBike: "Road Bike",
    size: "M",
    frameMaterials: "carbon",
    equipment: "Campagnolo",
    color: "Grey, Blue",
    weight: 8.37,
    image:
      "https://res.cloudinary.com/ironbike/image/upload/v1649846501/Products/Bike/Road%20Bike/Wilier_0_SL_Disc_Chorus_2x12_grau_blau_600x600_vrnca6.jpg",
    modelYears: 2022,
  },
  {
    productName: "Pinnarelo",
    quantity: 3,
    price: 8325,
    categoryBike: "Mountain Bike",
    size: "L",
    frameMaterials: "titanium",
    equipment: "Campagnolo",
    color: "white",
    weight: 11,
  },
];

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

const bikeBrands = [
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
  { name: "Shimano", brandLogo: "", headquarters: "", madeIn: "" },
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

const size = ["S", "M", "L"];

const frameMaterials = ["aluminum", "carbon", "titanium"];

function getOneBrand(brands) {
  let brand = brands[Math.floor(Math.random() * brands.length)].name;
  return brand;
}
const bikeCats = [
  "Road Bike",
  "Mountain Bike",
  "City Bike",
  "E-Bike",
  "Low Rider",
];

function getOneBikeCat(bikeCats) {
  let catBike = bikeCats[Math.floor(Math.random() * bikeCats.length)];
  return catBike;
}

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

// choose a quantity when we call the function
async function generateFakeBikes(quantity) {
  const fakeBikes = [];
  for (let i = 0; i < quantity; i++) {
    const bikename = faker.vehicle.bicycle();
    let bike = {
      productName: bikename,
      brand: await getOneBrand(bikeBrands),
      quantity: Math.floor(Math.random() * 20),
      image: "https://picsum.photos/300/300",
      price: faker.commerce.price(200, 4000),
      categoryBike: await getOneBikeCat(bikeCats),
      size: size[Math.floor(Math.random() * size.length)],
      frameMaterials:
        frameMaterials[Math.floor(Math.random() * frameMaterials.length)],
      color: faker.commerce.color(),
      weight: faker.datatype.number({ min: 1, max: 25, precision: 0.01 }),
      modelYears: faker.datatype.number({ min: 1997, max: 2022 }),
    };
    fakeBikes.push(bike);
  }
  return fakeBikes;
}

const perform = async () => {
  await connection;
  await createProducts();
  await generateFakeBikes(10);
  await mongoose.connection.close();
};
perform();
