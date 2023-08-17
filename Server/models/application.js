const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobID: String,
  email: String,
  fullName: String,
  country: String,
  phoneNumber: Number,
  CV: String,
});

module.exports = mongoose.model("Application", applicationSchema);
