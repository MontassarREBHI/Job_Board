const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.route("/").post(jobController.addJob).get(jobController.jobList);
router.post("/cvs",jobController.fileUpload,jobController.jobApply)
module.exports = router;
