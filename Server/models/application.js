const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobID: String,
  email: String,
  fullName: String,
  country: String,
  phoneNumber: Number,
  CV: String,
  applyDate:String,
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model("Application", applicationSchema);
