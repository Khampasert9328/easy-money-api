const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customername: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  occupation: { type: String },
  prove_id: { type: String },
  createdat: { type: Date, default: Date.now },
  updatedat: { type: Date, default: Date.now },
  maker_id: { type: String },
});

module.exports = mongoose.model("Customer", customerSchema);
