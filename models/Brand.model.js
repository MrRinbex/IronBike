const { Schema, model, mongoose } = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const brandSchema = new Schema({
  name: {
    type: String,
  },
  slug: { type: String, slug: "name" },
  brandLogo: {
    type: String,
  },
  headquarters: {
    type: String,
  },
  madeIn: {
    type: String,
  },
  foundationYear: Number,
});

const Brand = model("Brand", brandSchema);

module.exports = Brand;
