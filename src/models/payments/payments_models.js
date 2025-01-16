const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    contractid: { type: Schema.Types.ObjectId, ref: "Contract", required: true },
    paymentdate: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    status: { type: Number, default: 1 }, // 1 = pending, 2 = completed
    maker_id: { type: String },
    createdat: { type: Date, default: Date.now },
    updatedat: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Payment", paymentSchema);
  