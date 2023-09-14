const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  companyDesc: {
    type: String,
    required: true,
    unique: false,
  },
  employerEmail: {
    type: String,
    required: true,
    unique: false,
  },
  requirement: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  closureDate: {
    type: Date,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model("Job", jobSchema);
