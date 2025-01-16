const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productname: { type: String, required: true },
    productdesc: { type: String },
    createdat: { type: Date, default: Date.now },
    updatedat: { type: Date, default: Date.now },
    maker_id: { type: String },
  });
  
  module.exports = mongoose.model("Product", productSchema);
  