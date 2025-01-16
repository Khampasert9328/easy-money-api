const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contractSchema = new Schema({
    customerid: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    customername: { type: String, required: true },
    productname: { type: String, required: true },
    productdesc: { type: String },
    term_code: { type: String, required: true },
    amount: { type: Number, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    status: { type: Number, default: 1 }, // 1 = active
    maker_id: { type: String },
    createdat: { type: Date, default: Date.now },
    updatedat: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Contract", contractSchema);
  