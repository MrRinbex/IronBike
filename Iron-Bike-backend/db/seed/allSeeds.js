const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGODB_URI;
const MONGO_LOCAL_URI = process.env.MONGO_LOCAL_URI; // DATABASE LOCAL
const Brand = require("../../models/brand.model");
const { Product, Bike, Nutrition } = require("../../models/Product.model");
const { faker } = require("@faker-js/faker");

mongoose
  .connect(MONGO_URI) // DATABASE, LOCAL OU ONLINE ?
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

// --- N U T R I T I O N --- //
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

// --- B I K E S --- //

const realBikes = [
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
// --- B I K E S _ F U N C T I O N S --- //
function getOneBikeCat(bikeCats) {
  let catBike = bikeCats[Math.floor(Math.random() * bikeCats.length)];
  return catBike;
}

function getOneBrand(brands) {
  let brand = brands[Math.floor(Math.random() * brands.length)].name;
  return brand;
}

// Set quantiy and array when invoke function in seedDB()
// --- C R E A T E _ F A K E _ B I K E S --- //
async function generateFakeBikes(quantity, arrayOfBrandsIDs) {
  const fakeBikes = [];
  for (let i = 0; i < quantity; i++) {
    const bikename = faker.vehicle.bicycle();
    let number = Math.floor(Math.random() * arrayOfBrandsIDs.length);

    console.log(number, "RANDOM NUMBER");

    const theBrand = arrayOfBrandsIDs[number];
    console.log(theBrand, "THE BRAND OF THIS BIKE");

    let bike = {
      productName: `${bikename} ${i}`,
      quantity: Math.floor(Math.random() * 20),
      image: "https://picsum.photos/300/300",
      price: faker.commerce.price(200, 4000),
      // bikeBrand: getOneBrand(brands),
      categoryBike: await getOneBikeCat(bikeCats),
      size: size[Math.floor(Math.random() * size.length)],
      frameMaterials:
        frameMaterials[Math.floor(Math.random() * frameMaterials.length)],
      color: faker.commerce.color(),
      weight: faker.datatype.number({ min: 1, max: 25, precision: 0.01 }),
      modelYears: faker.datatype.number({ min: 1997, max: 2022 }),
      //
      brand: theBrand.id,
      bikeBrand: theBrand.name,
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

// --- S E E D _ T H E _ D A T A B A S E --- //
async function seedDB() {
  try {
    await Brand.deleteMany();
    // await Product.deleteMany({ __t: "Bike" });
    await Product.deleteMany();

    // await User.deleteMany();
    // await Product.deleteMany();
    // await Cart.deleteMany();
    // await Order.deleteMany();

    // R E A L _ D A T A //
    const leoBikes = await Bike.create(realBikes);
    const brandsDB = await Brand.create(brands);
    const nutrition = await Nutrition.create(nutritions);

    // G E T _ B R A N D S _ T O _ C R E A T E _ O T H E R S _ P R O D U C T S
    const allBrands = await Brand.find();
    //
    const brandsIdFromDB = await getBrandsIdFromDB(allBrands);
    console.log(brandsIdFromDB, "les BRANDS ID");

    // F A K E _ D A T A //
    const fakeBikes = await generateFakeBikes(20, brandsIdFromDB);
    console.log(fakeBikes, " - FAKE BIKE !");
    const allFakesBikes = await Bike.create(fakeBikes);
    //
    const allBikes = [...allFakesBikes, ...leoBikes];
    console.log(allBikes, "Bikes from db !");
  } catch (err) {
    console.log(`An error occurred while creating DATA from the DB: ${err}`);
  }
}
