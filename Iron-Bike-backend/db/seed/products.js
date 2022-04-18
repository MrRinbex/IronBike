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
    productName: "Wilier Triestina Zero",
    quantity: 5,
    price: 7025,
    category:"Bikes",
    categoryBike: "Road Bike",
    size: "M",
    frameMaterials: "Carbon",
    equipment: "Campagnolo",
    color: "Grey, Blue",
    weight: 8.37,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846501/Products/Bike/Road%20Bike/Wilier_0_SL_Disc_Chorus_2x12_grau_blau_600x600_vrnca6.jpg",
    modelYears: 2022,
    brand: "Willier Triestina",
  },
  {
    productName: "Focus Jam",
    quantity: 3,
    price: 8325,
    category:"Bikes",
    categoryBike: "Mountain Bike",
    size: "L",
    frameMaterials: "Titanium",
    equipment: "Campagnolo",
    color: "White",
    weight: 11,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649969273/Products/Bike/MTB/FOCUS_Jam_6_8_wei__grau_600x600_kclqtz.jpg",
    modelYears: 2020,
    brand: "Focus",
  },
  {
    productName: "VanMoof S3",
    quantity: 3,
    price: 2325,
    category:"Bikes",
    categoryBike: "E-Bike",
    size: "L",
    frameMaterials: "Carbon",
    equipment: "Campagnolo",
    color: "Black",
    weight: 11,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650286989/Products/Bike/E-bike/raw_pbcvoz.jpg",
    modelYears: 2022,
    brand: "VanMoof",
  },
  {
    productName: "Cowboy S4",
    quantity: 3,
    price: 2435,
    category:"Bikes",
    categoryBike: "E-Bike",
    size: "L",
    frameMaterials: "Titanium",
    equipment: "Campagnolo",
    color: "Black",
    weight: 12,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650290400/Products/Bike/E-bike/cowbS4_aewftz.jpg",
    modelYears: 2019,
    brand: "Cowboy",
  },
  {
    productName: "Sinus N5 ",
    quantity: 3,
    price: 1795,
    category:"Bikes",
    categoryBike: "E-Bike",
    size: "XL",
    frameMaterials: "Aluminum",
    equipment: "Campagnolo",
    color: "White",
    weight: 14,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650289417/Products/Bike/E-bike/compex-logo_geznby.jpg",
    modelYears: 2020,
    brand: "Winora Staiger",
  },
  {
    productName: "Focus Izalco ",
    quantity: 3,
    price: 6295,
    category:"Bikes",
    categoryBike: "Road Bike",
    size: "S",
    frameMaterials: "Carbon",
    equipment: "Campagnolo",
    color: "Green",
    weight: 7,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650289916/Products/Bike/E-bike/FOCUS_Izalco_Max_8_9_petrol_600x600_oehlqm.jpg",
    modelYears: 2022,
    brand: "Focus",
  },
  {
    productName: "Cube Litening C 68X SLT",
    quantity: 3,
    price: 7295,
    category:"Bikes",
    categoryBike: "Road Bike",
    size: "M",
    frameMaterials: "Carbon",
    equipment: "Shimano",
    color: "Black, Blue",
    weight: 6.5,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650271224/Products/Bike/Road%20Bike/Cube_Litening_C_68X_SLT_carbon_n_blue_600x600_vofcoe.jpg",
    modelYears: 2020,
    brand: "Cube",
  },
  {
    productName: "Kona Process",
    quantity: 3,
    price: 4499,
    category:"Bikes",
    categoryBike: "Mountain Bike",
    size: "M",
    frameMaterials: "Aluminum",
    equipment: "Shimano",
    color: "Orange",
    weight: 8.3,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649969273/Products/Bike/MTB/Kona_Process_134_DL_27_5__orange_600x600_b6cuua.jpg",
    modelYears: 2020,
    brand: "Kona",
  },
  {
    productName: "Wilier 110FX XT",
    quantity: 3,
    price: 4200,
    category:"Bikes",
    categoryBike: "Mountain Bike",
    size: "M",
    frameMaterials: "Aluminum",
    equipment: "Shimano",
    color: "Black, Red",
    weight: 8.2,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649969273/Products/Bike/MTB/Wilier_110FX_XT_1x12_966_SID_SL_schwarz_rot_600x600_ywzkt3.jpg",
    modelYears: 2021,
    brand: "Willier Triestina",
  },
  {
    productName: "Merida Team Bahrain",
    quantity: 3,
    price: 11230,
    category:"Bikes",
    categoryBike: "Road Bike",
    size: "L",
    frameMaterials: "Titanium",
    equipment: "Shimano",
    color: "Black, Orange",
    weight: 6.7,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650295892/Products/Bike/Road%20Bike/REACTO_team_BAHRAIN_MY2021_xrpnmf.jpg",
    modelYears: 2021,
    brand: "Merida",
  },
];

const nutritions = [
  {
    productName: "Isostar Power Tabs Energy Drink",
    quantity: 300,
    price: 11,
    category:"Nutrition",
    aspect: "Drinks",
    flavor: "Lemon",
    toTake: "Before Training",
    vegan: "Yes",
    weight: 0.5,
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649846405/Products/Nutrition/Drinks/ISOSTAR_POWERTABS_Energy_Drink_Tube_of_10_Tabs_of_12_g_q0mznx.jpg",
    brand: "Isostar",
  },
  {
    productName: "Stc Carbo Protein",
    quantity: 100,
    price: 43,
    category:"Nutrition",
    aspect: "Drinks",
    flavor: "Cookies",
    toTake: "After Training",
    vegan: "Yes",
    weight: 2.8,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846404/Products/Nutrition/Drinks/STC_NUTRITION_VEGETAL_PROTEIN_Recovery_Drink_750_g_oqjwvm.jpg",
    brand: "STC Nutrition",
  },
  {
    productName: "PowerBar Energize Pack",
    quantity: 100,
    price: 43,
    category:"Nutrition",
    aspect: "Bars",
    flavor: "Mango",
    toTake: "During Training",
    vegan: "Yes",
    weight: 2.5,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846463/Products/Nutrition/Bars/POWERBAR_ENERGIZE_C2MAX_Pack_fo_25_Energy_Bars_55_g_iofa9y.jpg",
    brand: "PowerBar",
  },
  {
    productName: "PowerBar Energize ",
    quantity: 100,
    price: 2.5,
    category:"Nutrition",
    aspect: "Bars",
    flavor: "Cookies",
    toTake: "During Training",
    vegan: "Yes",
    weight: 0.2,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846463/Products/Nutrition/Bars/POWERBAR_ENERGIZE_C2MAX_Energy_Bar_55_g_bm1wld.jpg",
    brand: "PowerBar",
  },
  {
    productName: "PowerBar Ride Pack ",
    quantity: 100,
    price: 35,
    category:"Nutrition",
    aspect: "Bars",
    flavor: "Coconut/Caramel",
    toTake: "During Training",
    vegan: "Yes",
    weight: 2.5,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846463/Products/Nutrition/Bars/POWERBAR_RIDE_Pack_of_18_Energy_Bars_55_g_rtsoqe.jpg",
    brand: "PowerBar",
  },
  {
    productName: "PowerBar Protein Plus ",
    quantity: 100,
    price: 3,
    category:"Nutrition",
    aspect: "Bars",
    flavor: "Cookies",
    toTake: "After Training",
    vegan: "Yes",
    weight: 0.2,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846462/Products/Nutrition/Bars/POWERBAR_PROTEIN_PLUS_LOW_SUGAR_Recovery_Bar_55_g_nazdug.jpg",
    brand: "PowerBar",
  },
  {
    productName: "PowerBar Naturel Pack",
    quantity: 100,
    price: 23,
    category:"Nutrition",
    aspect: "Bars",
    flavor: "Strawberry/Cranberry",
    toTake: "Before Training",
    vegan: "Yes",
    weight: 2.8,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846462/Products/Nutrition/Bars/POWERBAR_NATURAL_LONG_LASTING_ENERGY_Pack_of_25_Energy_Bars_40_g_qtnzem.jpg",
    brand: "PowerBar",
  },
  {
    productName: "PowerBar Recovery",
    quantity: 100,
    price: 40,
    category:"Nutrition",
    aspect: "Drinks",
    flavor: "Chocolate",
    toTake: "After Training",
    vegan: "None",
    weight: 1.8,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846404/Products/Nutrition/Drinks/POWERBAR_RECOVERY_2.0_Recovery_Drink_1.14_kg_xgmlaz.jpg",
    brand: "PowerBar",
  },
  {
    productName: "PowerBar IsoActive Energy",
    quantity: 100,
    price: 21,
    category:"Nutrition",
    aspect: "Drinks",
    flavor: "Orange",
    toTake: "After Training",
    vegan: "None",
    weight: 1.2,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846404/Products/Nutrition/Drinks/POWERBAR_ISOACTIVE_Energy_Drink_600_g_n2f80f.jpg",
    brand: "PowerBar",
  },
  {
    productName: "PowerBar 5 Electrolytes Energy",
    quantity: 100,
    price: 49,
    category:"Nutrition",
    aspect: "Drinks",
    flavor: "Lemon",
    toTake: "Before Training",
    vegan: "None",
    weight: 0.9,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846404/Products/Nutrition/Drinks/POWERBAR_5_ELECTROLYTES_Pack_of_12_Anti-cramp_Drink_Tubes_Tubes_of_10_Tablets_r3qgkf.jpg",
    brand: "PowerBar",
  },
  {
    productName: "Isostar Hydrate",
    quantity: 300,
    price: 19,
    category:"Nutrition",
    aspect: "Drinks",
    flavor: "Lemon",
    toTake: "During Training",
    vegan: "Yes",
    weight: 0.5,
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649846405/Products/Nutrition/Drinks/ISOSTAR_HYDRATE_PERFORM_Energy_Drink_560_g_ql3svh.jpg",
    brand: "Isostar",
  },
  {
    productName: "Isostar Energy Shot",
    quantity: 300,
    price: 1.2,
    category:"Nutrition",
    aspect: "Drinks",
    flavor: "Grenadine",
    toTake: "During Training",
    vegan: "Yes",
    weight: 0.06,
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649846405/Products/Nutrition/Drinks/ISOSTAR_HYDRATE_PERFORM_Energy_Drink_560_g_ql3svh.jpg",
    brand: "Isostar",
  },
];



const getBrandId = async (brandName) => {
  const brand = await Brand
    .findOne({ 'name': brandName  })
  return brand?._id;
}

const seedBike = async (bike) => {
  try {
    const brandId = await getBrandId(bike.brand);
    if (brandId) {
      const createdProduct = await Bike.create({...bike,
        brand: brandId,
      })
      console.log(createdProduct)
      console.log(`${bike.brand} bike is: `, createdProduct)
    } else {
      console.log(`No brand for ${bike.brand}...`)
    }
  } catch (error) {
    console.log(error)
  }
}

const seedNutrition = async (nutrition) => {
  try {
    const brandId = await getBrandId(nutrition.brand);
    if (brandId) {
      const createdProduct = await Nutrition.create({...nutrition,
        brand: brandId,
      })
      console.log(createdProduct)
      console.log(`${nutrition.brand} nutrition is: `, createdProduct)
    } else {
      console.log(`No brand for ${nutrition.brand}...`)
    }
  } catch (error) {
    console.log(error)
  }
}









const perform = async () => {
  await connection;
  await Product.deleteMany();
  await Promise.all(bikes.map((product) => seedBike(product)))
  await Promise.all(nutritions.map((product) => seedNutrition(product)))
  await mongoose.connection.close();
};
perform();
