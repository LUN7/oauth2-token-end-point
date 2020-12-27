const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
const { Schema } = mongoose

const client = new Schema({
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true },
  isTrusted: {type: String, require: true, default: true}
},
{
  timestamps: true
});

const tokenDB = mongoose 

module.exports = tokenDB.model("Clients", client);
