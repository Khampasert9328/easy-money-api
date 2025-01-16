const mongoose  = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    maker_id: { type: String },
    createdat: { type: Date, default: Date.now },
    updatedat: { type: Date, default: Date.now },
  });
// Encrypt password before saving user
UserSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
};
UserSchema.methods.checkPassword = async function(password) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
};

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;

