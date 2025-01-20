const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_type: { type: Schema.Types.ObjectId, ref: "ProductType", required: true }, // Fixed reference
  productname: { type: String, required: true },
  image: { type: String, required: true },
  productdesc: { type: String },
  createdat: { type: Date, default: Date.now },
  updatedat: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
  