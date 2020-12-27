const mongoose = require("mongoose");
const {Schema } = mongoose;

const user = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  clientId: { type: String, required: true }, // also used to reference to a shop
  username: { type: String, require: true },
  provider: { type: String, default: "" },
  password: { type: String, require: true },
  role: {type: String, default: "customer0"}, // owner${level} customer${level}, 
  address: { type: Object }, // array of address
  defaultAddress: { type: String } // key of address
},
{
  timestamps: true
});

const userDB = mongoose 

module.exports = userDB.model("Users", user);
