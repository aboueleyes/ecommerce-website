/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  password: String
});
module.exports = mongoose.model('User', userSchema);
