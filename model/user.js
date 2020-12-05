const mongoose = require("mongoose");
const {Schema } = mongoose;

const user = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  username: { type: String, require: true },
  provider: { type: String, default: "" },
  password: { type: String, require: true },
});

const userDB = mongoose 

module.exports = userDB.model("Users", user);
