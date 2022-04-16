const connection = require("../index");
const { default: mongoose } = require("mongoose");
const Brand = require("../../models/brand.model");

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
