const mongoose = require("mongoose");
const {Schema } = mongoose;

const user = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  clientId: { type: String, required: true },
  username: { type: String, require: true },
  provider: { type: String, default: "" },
  password: { type: String, require: true },
  role: {type: Number, default: "buyer0"}, // Seller, Buyer${level}, 
  isVip: {type: Boolean, default: false}
});

const userDB = mongoose 

module.exports = userDB.model("Users", user);
