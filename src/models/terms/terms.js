const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const termSchema = new Schema({
    term_code: { type: String, unique: true, required: true },
    term_desc: { type: String },
    createdat: { type: Date, default: Date.now },
    updatedat: { type: Date, default: Date.now },
    maker_id: { type: String },
  });
  
  module.exports = mongoose.model("Term", termSchema);
  