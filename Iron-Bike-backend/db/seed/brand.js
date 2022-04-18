const connection = require("../index");
const { default: mongoose } = require("mongoose");
const Brand = require("../../models/brand.model");

const brands = [
  {
    name: "Kona",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650292675/Products/Brand/png-clipart-kona-bicycle-company-bicycle-shop-mountain-bike-cycling-bicycle-text-logo_rlrisj.png",
    headquarters: "USA",
    madeIn: "USA",
    foundationYear: 1988,
  },
  {
    name: "Willier Triestina",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1649861921/Products/Brand/Wilier_triestina_logo_gvptdy.png",
    headquarters: "Italy",
    madeIn: "Italy",
    foundationYear: 1906,
  },
  {
    name: "Cube",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650291752/Products/Brand/langfr-2880px-CUBE_Logo_neu.svg_wpyxcd.png",
    headquarters: "Germany",
    madeIn: "EU",
    foundationYear: 1993,
  },
  {
    name: "Isostar",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1649861921/Products/Brand/Isostar_logo.svg_aktlsc.png",
    headquarters: "Suisse",
    madeIn: "France",
    foundationYear: 1977,
  },
  {
    name: "Focus",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650272325/Products/Brand/Focus_Bikes_Logo_cjq99g.png",
    headquarters: "Germany",
    madeIn: "Germany",
    foundationYear: 1992,
  },
  {
    name: "STC Nutrition",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650275144/Products/Brand/stc-logo-16270426081_cnk8qd.jpg",
    headquarters: "France",
    madeIn: "France",
    foundationYear: 2002,
  },
  {
    name: "Sram",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650275324/Products/Brand/SRAM_logo.svg_i5hoaf.png",
    headquarters: "USA",
    madeIn: "China",
    foundationYear: 1987,
  },
  {
    name: "Santini",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650275844/Products/Brand/langfr-1920px-Santini_SMS_logo.svg_cp6fgx.png",
    headquarters: "Italy",
    madeIn: "ITaly",
    foundationYear: 1965,
  },
  {
    name: "Oakley",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650276400/Products/Brand/Oakley_logo.svg_bc3pqz.png",
    headquarters: "UK",
    madeIn: "UK",
    foundationYear: 1975,
  },
  {
    name: "SIDI",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650276673/Products/Brand/logo_2_cyycpl.png",
    headquarters: "Italy",
    madeIn: "Italy",
    foundationYear: 1960,
  },
  {
    name: "Specialized",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650276823/Products/Brand/Specialized_red_S_black_logotype_f8ankj.png",
    headquarters: "USA",
    madeIn: "USA",
    foundationYear: 1974,
  },
  {
    name: "Poc",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650277154/Products/Brand/194-1941566_jobs-sri-opportunities-png-abeoncliparts-graduation-poc-logo_cfouix.jpg",
    headquarters: "Sweden",
    madeIn: "Sweden",
    foundationYear: 2004,
  },
  {
    name: "Giro",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650277323/Products/Brand/Giro__company__logo.svg_ytl8cp.png",
    headquarters: "USA",
    madeIn: "China",
    foundationYear: 1985,
  },
  {
    name: "Winora Staiger",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650277570/Products/Brand/2560px-Winora_Group_Logo_2016.svg_ycflsu.png",
    headquarters: "Germany",
    madeIn: "China",
    foundationYear: 1914,
  },
  {
    name: "Compex",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650278078/Products/Brand/compex-logo_tom3wy.png",
    headquarters: "Suisse",
    madeIn: "Tunisia",
    foundationYear: 1986,
  },
  {
    name: "Garmin",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650278224/Products/Brand/5a10a8d39642de34b6b65d0c_rmmofe.png",
    headquarters: "USA",
    madeIn: "China",
    foundationYear: 1989,
  },
  {
    name: "Merida",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650278224/Products/Brand/5a10a8d39642de34b6b65d0c_rmmofe.png",
    headquarters: "Taïwan",
    madeIn: "Taïwan",
    foundationYear: 1972,
  },
  {
    name: "Cowboy",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650285420/Products/Brand/cowboy_logo_new_tdeetu.png",
    headquarters: "Belgium",
    madeIn: "Belgium",
    foundationYear: 2017,
  },
  {
    name: "VanMoof",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650285859/Products/Brand/VanMoof-Logo_umwtkr.png",
    headquarters: "Netherlands",
    madeIn: "Netherlands",
    foundationYear: 2008,
  },
  {
    name: "PowerBar",
    brandLogo:
      "https://res.cloudinary.com/ironbike/image/upload/v1650296565/Products/Brand/kisspng-powerbar-dietary-supplement-energy-bar-business-nu-sliding-bar-5b246641508c23.7268255515291121293299_eoosvj.jpg",
    headquarters: "USA",
    madeIn: "USA",
    foundationYear: 1986,
  },
];

const createBrands = async (req, res, next) => {
  await Brand.deleteMany();
  await Brand.create(brands);

  const allBrands = await Brand.find();
  console.log(allBrands);
};
const perform = async () => {
  await connection;
  await createBrands();
  await mongoose.connection.close();
};
perform();
