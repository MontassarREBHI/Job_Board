const mongoose = require("mongoose");
const Job = require("../models/job");
const Application = require("../models/application");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".pdf";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const fileUpload = upload.single("CV");

const jobApply = async (req, res) => {
  const { jobID, email, fullName, country, phoneNumber } = req.body;
  const CVFile = req.file;
  const newApplication = new Application({
    jobID,
    email,
    fullName,
    country,
    phoneNumber,
    CV: CVFile.filename,
  });
  await newApplication.save();
  newApplication
    ? res.status(200).json({
        message: "new application was submitted successfully!",
        newApplication,
        path: CVFile.path,
      })
    : res.status(400).send("something went wrong");
};

const addJob = async (req, res) => {
  const { title, companyDesc, requirement, description } = req.body;
  try {
    const job = new Job({ title, companyDesc, requirement, description });
    await job.save();
    res.status(200).json({ job, message: "job offer created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Something went wrong");
  }
};

const jobList = async (req, res) => {
  try {
    const list = await Job.find({});
    res.status(200).json({ list, message: "list of available jobs" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Something went wrong");
  }
};

module.exports = { addJob, jobList, fileUpload, jobApply };
