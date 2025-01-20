const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productTypeSchema = new Schema({
        product_type: { type: String, required: true },
        createdat: { type: Date, default: Date.now },
        updatedat: { type: Date, default: Date.now },
    });
    module.exports = mongoose.model("ProductType", productTypeSchema);