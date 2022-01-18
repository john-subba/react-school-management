const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  schoolAddress: {
    type: String,
  },
  schoolPhoneNo: {
    type: Number,
  },
  schoolDesc: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

// 'user' is the model name and UserSchema is the usermodel which we have created abv
module.exports = User = mongoose.model('user', UserSchema);
