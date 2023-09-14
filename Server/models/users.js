const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    unique: false,
  },
  phone: {
    type: String,
    required: false,
    unique: false,
  },
  photo: {
    type: String,
    required: false,
    unique: false,
  },
  address: {
    type: String,
    required: false,
    unique: false,
  },
  CV: {
    type: String,
    required: false,
  },
  linkedIn: {
    type: String,
    required: false,
    unique: true,
  },
  title: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
