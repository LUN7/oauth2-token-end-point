const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
const { Schema } = mongoose

const token = new Schema({
  userId: { type: String, required: true },
  clientId: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: Array, default: null },
});

const tokenDB = mongoose 

module.exports = tokenDB.model("Tokens", token);
