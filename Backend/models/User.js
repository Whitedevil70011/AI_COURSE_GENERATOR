const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true }, // Auth0 sub
  email: { type: String, required: true },
  name: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);