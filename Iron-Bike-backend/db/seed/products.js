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
    productName: "Gorille Tricycle",
    quantity: 5,
    price: 2200,
    category:"Bikes",
    categoryBike: "City Bike",
    size: "S",
    frameMaterials: "Aluminum",
    equipment: "Shimano",
    color: "Black",
    weight: 30,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650740059/Products/Bike/city%20bike/TRICYCLE-GORILLE-CYCLES-EBIKE-FAT-BIKE-1-2-1000x718_dqk5te.png",
    modelYears: 2020,
    brand: "Gorille Cycle",
  },
  {
    productName: "Gorille Lady",
    quantity: 5,
    price: 2100,
    category:"Bikes",
    categoryBike: "City Bike",
    size: "S",
    frameMaterials: "Aluminum",
    equipment: "Shimano",
    color: "Pink",
    weight: 13,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650740255/Products/Bike/city%20bike/IMG_4128p_x3xxgk.png",
    modelYears: 2021,
    brand: "Gorille Cycle",
  },
  {
    productName: "Gorille Retro",
    quantity: 5,
    price: 3200,
    category:"Bikes",
    categoryBike: "City Bike",
    size: "S",
    frameMaterials: "Aluminum",
    equipment: "Shimano",
    color: "White",
    weight: 15,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650740463/Products/Bike/city%20bike/IMG_2759-1000x727_y5yc3n.png",
    modelYears: 2022,
    brand: "Gorille Cycle",
  },
  {
    productName: "Gorille Male",
    quantity: 5,
    price: 2200,
    category:"Bikes",
    categoryBike: "City Bike",
    size: "M",
    frameMaterials: "Aluminum",
    equipment: "Shimano",
    color: "Red",
    weight: 13,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650740544/Products/Bike/city%20bike/IMG_2835-1000x727_uskbhx.png",
    modelYears: 2020,
    brand: "Gorille Cycle",
  },
  {
    productName: "Commencal Ramones Green",
    quantity: 5,
    price: 200,
    category:"Bikes",
    categoryBike: "Kid Bike",
    size: "S",
    frameMaterials: "Aluminum",
    equipment: "Shimano",
    color: "Green, Black",
    weight: 4,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650741380/Products/Bike/kid%20bike/600x600-203893_16130515460656_chupin.jpg",
    modelYears: 2020,
    brand: "Commencal",
  },
  {
    productName: "Commencal Ramones Chrome",
    quantity: 5,
    price: 250,
    category:"Bikes",
    categoryBike: "Kid Bike",
    size: "S",
    frameMaterials: "Aluminum",
    equipment: "Shimano",
    color: "Chrome",
    weight: 4,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650741380/Products/Bike/kid%20bike/600x600-186719_15949054493444_b2h53s.jpg",
    modelYears: 2020,
    brand: "Commencal",
  },
  {
    productName: "Commencal Girl",
    quantity: 5,
    price: 80,
    category:"Bikes",
    categoryBike: "Kid Bike",
    size: "S",
    frameMaterials: "Aluminum",
    equipment: "Shimano",
    color: "Blue, White",
    weight: 5,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1650741380/Products/Bike/kid%20bike/Vermont_Girly_16__B-Ware_Kinder_blau_600x600_umjznl.jpg",
    modelYears: 2018,
    brand: "Commencal",
  },
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
    price: 2,
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
    weight: 0.9,
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649846405/Products/Nutrition/Drinks/ISOSTAR_HYDRATE_PERFORM_Energy_Drink_560_g_ql3svh.jpg",
    brand: "Isostar",
  },
  {
    productName: "Isostar Energy Shot",
    quantity: 300,
    price: 2,
    category:"Nutrition",
    aspect: "Drinks",
    flavor: "Grenadine",
    toTake: "During Training",
    vegan: "Yes",
    weight: 0.06,
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649846404/Products/Nutrition/Drinks/ISOSTAR_ENERGY_SHOT_Energy_Drink_60_ml_srtxvl.jpg",
    brand: "Isostar",
  },
  {
    productName: "Stc Premium Whey Protein",
    quantity: 100,
    price: 32,
    category:"Nutrition",
    aspect: "Energy Meals",
    flavor: "Chocolate",
    toTake: "After Training",
    vegan: "Yes",
    weight: 1.8,
    image:"https://res.cloudinary.com/ironbike/image/upload/v1649846404/Products/Nutrition/Drinks/STC_NUTRITION_PREMIUM_WHEY_Recovery_Drink_Chocolat_750g_k4y2s1.jpg",
    brand: "STC Nutrition",
  },
  {
    productName: "Isostar Energy Booster Pack",
    quantity: 300,
    price: 11,
    category:"Nutrition",
    aspect: "Gels",
    flavor: "Citrus",
    toTake: "During Training",
    vegan: "None",
    weight: 0.46,
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650310384/Products/Nutrition/Gels/600x600-149416_15869577608897_q2c5hc.jpg",
    brand: "Isostar",
  },
  {
    productName: "Isostar Bcaa Booster Pack",
    quantity: 300,
    price: 12,
    category:"Nutrition",
    aspect: "Gels",
    flavor: "Red Fruits",
    toTake: "During Training",
    vegan: "None",
    weight: 0.46,
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650311013/Products/Nutrition/Gels/600x600-149419_15223958399081_wxozfe.jpg",
    brand: "Isostar",
  },
  {
    productName: "Isostar Energy Gel Cherry",
    quantity: 300,
    price: 2,
    category:"Nutrition",
    aspect: "Gels",
    flavor: "Cherry",
    toTake: "During Training",
    vegan: "None",
    weight: 0.35,
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650311276/Products/Nutrition/Gels/600x600-149403_15228292510149_oxufxu.jpg",
    brand: "Isostar",
  },
  {
    productName: "Isostar Energy Gel Lemon",
    quantity: 300,
    price: 2,
    category:"Nutrition",
    aspect: "Gels",
    flavor: "Lemon",
    toTake: "During Training",
    vegan: "None",
    weight: 0.35,
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650311276/Products/Nutrition/Gels/600x600-149403_15228292444723_zzztdp.jpg",
    brand: "Isostar",
  },
];

const clothes = [
  {
    productName: "Santini UCI WORLD",
    quantity: 300,
    size: "M",
    price: 72,
    category:"Clothes",
    type:"Jerseys",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650312191/Products/Clothes/600x600-239721_1612531479724_ist3cn.jpg",
    ReflectiveEquipment: "None",
    rainProtection: "None", 
    color: "White", 
    brand: "Santini", 
  },
  {
    productName: "Santini Pro Alba Tights",
    quantity: 300,
    size: "M",
    price: 49,
    category:"Clothes",
    type:"Trousers",
    sexCategory: "Women",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650313657/Products/Clothes/600x600-201173_15979357976771_ymqxjz.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "Black", 
    brand: "Santini", 
  },
  {
    productName: "Santini Trek Segafredo Shorts",
    quantity: 300,
    size: "M",
    price: 99,
    category:"Clothes",
    type:"Trousers",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650314017/Products/Clothes/600x600-291889_16454382596949_w34tsq.jpg",
    ReflectiveEquipment: "None",
    rainProtection: "None", 
    color: "Blue, Red", 
    brand: "Santini", 
  },
  {
    productName: "Santini La Fleche Wallone Shorts",
    quantity: 300,
    size: "M",
    price: 99,
    category:"Clothes",
    type:"Trousers",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650314017/Products/Clothes/600x600-294465_16454378446991_bongcf.jpg",
    ReflectiveEquipment: "None",
    rainProtection: "None", 
    color: "Black, Yellow", 
    brand: "Santini", 
  },
  {
    productName: "Santini Shorts",
    quantity: 300,
    size: "M",
    price: 69,
    category:"Clothes",
    type:"Trousers",
    sexCategory: "Women",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649969624/Products/Clothes/600x600-294413_16460467100265_b6akq3.jpg",
    ReflectiveEquipment: "None",
    rainProtection: "None", 
    color: "Blue", 
    brand: "Santini", 
  },
  {
    productName: "Santini TDF Jersey",
    quantity: 300,
    size: "M",
    price: 89,
    category:"Clothes",
    type:"Jerseys",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650314482/Products/Clothes/600x600-285901_16391426018104_zotvdc.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "Blue", 
    brand: "Santini", 
  },
  {
    productName: "Santini Trek Segafredo ITA Jersey",
    quantity: 300,
    size: "M",
    price: 109,
    category:"Clothes",
    type:"Jerseys",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650314482/Products/Clothes/600x600-291887_16454396418094_glhwzs.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "White, Green, Red", 
    brand: "Santini", 
  },
  {
    productName: "Santini Paris Roubaix Jersey",
    quantity: 300,
    size: "M",
    price: 69,
    category:"Clothes",
    type:"Jerseys",
    sexCategory: "Women",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650314482/Products/Clothes/600x600-294503_16479680630056_cv0yhp.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "Black", 
    brand: "Santini", 
  },
  {
    productName: "Oakley Icon shorts",
    quantity: 300,
    size: "M",
    price: 79,
    category:"Clothes",
    type:"Jerseys",
    sexCategory: "Women",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650315705/Products/Clothes/600x600-183853_15849560038724_xsbxto.jpg",
    ReflectiveEquipment: "None",
    rainProtection: "None", 
    color: "Black", 
    brand: "Oakley", 
  },
  {
    productName: "Oakley Font Goggles Pink",
    quantity: 300,
    size: "M",
    price: 109,
    category:"Clothes",
    type:"Glasses",
    sexCategory: "Women",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650315240/Products/Clothes/600x600-236621_16130418436609_vlrlxb.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "Pink", 
    brand: "Oakley", 
  },
  {
    productName: "Oakley Airbrake Goggles Orange",
    quantity: 300,
    size: "M",
    price: 129,
    category:"Clothes",
    type:"Glasses",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650315240/Products/Clothes/600x600-258937_16318814693122_um2s3c.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "Orange", 
    brand: "Oakley", 
  },
  {
    productName: "Oakley Airbrake Goggles Green",
    quantity: 300,
    size: "M",
    price: 129,
    category:"Clothes",
    type:"Glasses",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650315068/Products/Clothes/600x600-258935_16318813623192_rnpuhv.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "Green", 
    brand: "Oakley", 
  },
  {
    productName: "Oakley Airbrake Goggles Yellow",
    quantity: 300,
    size: "M",
    price: 129,
    category:"Clothes",
    type:"Glasses",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650315240/Products/Clothes/600x600-258941_16318813124677_avovyw.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "Yellow", 
    brand: "Oakley", 
  },
  {
    productName: "Oakley Encoder Purple",
    quantity: 300,
    size: "M",
    price: 199,
    category:"Clothes",
    type:"Glasses",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650315925/Products/Clothes/600x600-236507_16399936495675_p09hqb.jpg",
    ReflectiveEquipment: "None",
    rainProtection: "None", 
    color: "Purple", 
    brand: "Oakley", 
  },
  {
    productName: "Oakley Radar Grey",
    quantity: 300,
    size: "M",
    price: 129,
    category:"Clothes",
    type:"Glasses",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650315925/Products/Clothes/600x600-236563_16176927288849_p39sd4.jpg",
    ReflectiveEquipment: "None",
    rainProtection: "None", 
    color: "Grey", 
    brand: "Oakley", 
  },
  {
    productName: "Giro Cinder",
    quantity: 300,
    size: "M",
    price: 119,
    category:"Clothes",
    type:"Helmets",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649969624/Products/Clothes/600x600-130588_1481273347575_wqlgrr.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "Grey", 
    brand: "Giro", 
  },
  {
    productName: "Giro Agilis",
    quantity: 300,
    size: "M",
    price: 79,
    category:"Clothes",
    type:"Helmets",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649969624/Products/Clothes/600x600-175789_15741606359316_jeu3qk.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "Grey", 
    brand: "Giro", 
  },
  {
    productName: "Poc Tectal",
    quantity: 300,
    size: "M",
    price: 239,
    category:"Clothes",
    type:"Helmets",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649969624/Products/Clothes/600x600-261865_16303296605945_sjqbgy.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "Black", 
    brand: "Poc", 
  },
  {
    productName: "Poc Omne",
    quantity: 300,
    size: "M",
    price: 156,
    category:"Clothes",
    type:"Helmets",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649969624/Products/Clothes/600x600-284585_16449285794106_stf6pq.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "None", 
    color: "White, Orange", 
    brand: "Poc", 
  },
  {
    productName: "Sidi Sixty Red",
    quantity: 300,
    size: "M",
    price: 299,
    category:"Clothes",
    type:"Shoes",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650316958/Products/Clothes/600x600-216699_16122191944224_dfabfx.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "Yes", 
    color: "Red", 
    brand: "Sidi", 
  },
  {
    productName: "Sidi Sixty Grey",
    quantity: 300,
    size: "M",
    price: 299,
    category:"Clothes",
    type:"Shoes",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650316958/Products/Clothes/600x600-221817_16219497662233_ycmot8.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "Yes", 
    color: "Grey", 
    brand: "Sidi", 
  },
  {
    productName: "Sidi Shot 2 White",
    quantity: 300,
    size: "M",
    price: 339,
    category:"Clothes",
    type:"Shoes",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650316958/Products/Clothes/600x600-216569_1622801544638_nhmhjj.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "Yes", 
    color: "White", 
    brand: "Sidi", 
  },
  {
    productName: "Sidi Genius Blue",
    quantity: 300,
    size: "M",
    price: 239,
    category:"Clothes",
    type:"Shoes",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650316958/Products/Clothes/600x600-271877_16462983591085_fgo7y9.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "Yes", 
    color: "Blue", 
    brand: "Sidi", 
  },
  {
    productName: "Sidi Shot 2 Blue",
    quantity: 300,
    size: "M",
    price: 339,
    category:"Clothes",
    type:"Shoes",
    sexCategory: "Men",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650316958/Products/Clothes/600x600-271875_16464096952094_pti3lm.jpg",
    ReflectiveEquipment: "Yes",
    rainProtection: "Yes", 
    color: "Blue", 
    brand: "Sidi", 
  },
]


const accessories = [
  {
    productName: "Polar H9",
    quantity: 300,
    price: 69,
    category:"Accessory",
    features: "Heart Rate Monitor",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650318072/Products/accessory/600x600-191569_16043123153328_ozo4an.jpg",
    color: "Black", 
    size: "S",
    brand: "Polar", 
  },
  {
    productName: "Polar Speed Kit",
    quantity: 300,
    price: 63,
    category:"Accessory",
    features: "Bluetooth",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650318423/Products/accessory/600x600-98649-kit-vitesse-et-cadence-polar-bluetooth_cn3nq5.jpg",
    color: "Black", 
    size: "S",
    brand: "Polar", 
  },
  {
    productName: "Polar Vantage Kit",
    quantity: 300,
    price: 549,
    category:"Accessory",
    features: "GPS",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650318423/Products/accessory/600x600-212629_16043084968826_rkxbue.jpg",
    color: "Grey", 
    size: "S",
    brand: "Polar", 
  },
  {
    productName: "Polar M430",
    quantity: 300,
    price: 229,
    category:"Accessory",
    features: "GPS",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650318423/Products/accessory/600x600-137604_14979450545454_qvfits.jpg",
    color: "Black", 
    size: "S",
    brand: "Polar", 
  },
  {
    productName: "Garmin Edge 830",
    quantity: 300,
    price: 289,
    category:"Accessory",
    features: "GPS",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1649969328/Products/accessory/600x600-166208_15578245996799_eekevj.jpg",
    color: "Black", 
    size: "S",
    brand: "Garmin", 
  },
  {
    productName: "Garmin Edge 1030",
    quantity: 300,
    price: 439,
    category:"Accessory",
    features: "GPS",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650318853/Products/accessory/600x600-199089_15935889527235_qyjgoi.jpg",
    color: "Black", 
    size: "S",
    brand: "Garmin", 
  },
  {
    productName: "Garmin Fenix S7",
    quantity: 300,
    price: 939,
    category:"Accessory",
    features: "Wireless",
    image: "https://res.cloudinary.com/ironbike/image/upload/v1650318999/Products/accessory/600x600-294149_16461474789231_ujxy5k.jpg",
    color: "Black", 
    size: "S",
    brand: "Garmin", 
  },
]



const getBrandId = async (brandName) => {
  const brand = await Brand
    .findOne({ 'name': brandName  })
  return brand?._id;
}

// seed Bikes

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

// seed Nutrition

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

// seed Clothes

const seedClothes = async (clothe) => {
  try {
    const brandId = await getBrandId(clothe.brand);
    if (brandId) {
      const createdProduct = await Clothes.create({...clothe,
        brand: brandId,
      })
      console.log(createdProduct)
      console.log(`${clothe.brand} clothe is: `, createdProduct)
    } else {
      console.log(`No brand for ${clothe.brand}...`)
    }
  } catch (error) {
    console.log(error)
  }
}

// seed Accessory

const seedAccessory = async (accessory) => {
  try {
    const brandId = await getBrandId(accessory.brand);
    if (brandId) {
      const createdProduct = await Accessory.create({...accessory,
        brand: brandId,
      })
      console.log(createdProduct)
      console.log(`${accessory.brand} accessory is: `, createdProduct)
    } else {
      console.log(`No brand for ${accessory.brand}...`)
    }
  } catch (error) {
    console.log(error)
  }
}


const perform = async () => {
  await connection;
  await Product.deleteMany();
  await Promise.all(accessories.map((product) => seedAccessory(product)))
  await Promise.all(nutritions.map((product) => seedNutrition(product)))
  await Promise.all(clothes.map((product) => seedClothes(product)))
  await Promise.all(bikes.map((product) => seedBike(product)))
  await mongoose.connection.close();
};
perform();
