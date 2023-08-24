const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const applicationController = require("../controllers/applicationController");
router.route("/").post(jobController.addJob).get(jobController.jobList);
router.post("/cvs", jobController.fileUpload, jobController.jobApply);
router.get("/:email", jobController.getListByEmployer);
router.get("/applications/:id", jobController.getApplicationByPost);
router.put("/",applicationController.manageApplication)
module.exports = router;
