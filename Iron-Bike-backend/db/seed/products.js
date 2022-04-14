const connection = require('../index')
const { default: mongoose } = require('mongoose')
const {Product, Bike, Accessory, Nutrition, Clothes} = require('../../models/Product.model')
const Brand = require('../../models/Brand.model')

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
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649846501/Products/Bike/Road%20Bike/Wilier_0_SL_Disc_Chorus_2x12_grau_blau_600x600_vrnca6.jpg",
    modelYears: 2022
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
]

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
]

const createProducts = async (req, res, next) => {
  await Product.deleteMany()

  const willierBrand = await Brand.findOne({name: "Willier Triestina"}) 
  bikes[0].brand = willierBrand._id

  await Bike.create(bikes)

  const isostarBrand = await Brand.findOne({name: "Isostar"}) 
  nutritions[0].brand = isostarBrand._id


  await Nutrition.create(nutritions)

  const products = await Product.find()
  console.log(products)

  
}
const perform = async () => {
  await connection
  await createProducts()
  await mongoose.connection.close()
}
perform()