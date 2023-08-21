const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.route("/").post(jobController.addJob).get(jobController.jobList);
router.post("/cvs",jobController.fileUpload,jobController.jobApply)
router.get("/:email",jobController.getListByEmployer)
router.get("/:id",jobController.getApplicationByPost)
module.exports = router;
