const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  rollnumber: {type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  accounttype: { type: String, required: true, default: 'student' },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
