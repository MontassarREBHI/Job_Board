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

const fileUpload = upload?.single("CV");

const jobApply = async (req, res) => {
  const { jobID, email, fullName, country, phoneNumber, applyDate } = req.body;
  const CVFile = req?.file;
  if (
    !jobID ||
    !email ||
    !fullName ||
    !country ||
    !phoneNumber ||
    !applyDate ||
    !CVFile
  )
    return res.status(400).send("inputs not filled correctly");
  const existingApplication = await Application.findOne({ jobID, email });
  if (existingApplication)
    return res.status(400).send("you already applied for this position");
  const newApplication = new Application({
    jobID,
    email,
    fullName,
    country,
    phoneNumber,
    CV: CVFile.filename,
    applyDate,
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
  const {
    title,
    companyDesc,
    requirement,
    description,
    employerEmail,
    closureDate,
  } = req.body;
  try {
    const job = new Job({
      title,
      companyDesc,
      requirement,
      description,
      employerEmail,
      closureDate,
    });
    await job.save();
    res.status(200).json({ job, message: "job offer created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Something went wrong");
  }
};

const jobList = async (req, res) => {
  try {
    const allThelist = await Job.find({});
    const list = allThelist.filter((job) => job.closureDate > new Date());
    res.status(200).json({ list, message: "list of available jobs" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Something went wrong");
  }
};

const getListByEmployer = async (req, res) => {
  const { email } = req.params;
  const listOfJobs = await Job.find({ employerEmail: email });
  listOfJobs.length
    ? res.status(200).json({ listOfJobs, message: "here is the list!" })
    : res.status(400).send("no job found");
};

const getListByApplicant = async (req, res) => {
  const { email } = req.params;
  const listOfApplications = await Application.find({ email }).lean();
  if (listOfApplications.length) {
    const result = await Promise.all(
      listOfApplications.map(async (e) => {
        const job = await Job.findOne({ _id: e.jobID }).lean();

        const newApplication = {
          ...e,
          jobTitle: job.title,
          companyDesc: job.companyDesc,
          employerEmail: job.employerEmail,
        };

        return newApplication;
      })
    );

    res.status(200).json({ result, message: "here is the list!" });
  } else res.status(400).send("no application found or something went wrong!");
};

// get application by post
const getApplicationByPost = async (req, res) => {
  const { id } = req.params;
  const applicationToThisJob = await Application.find({
    jobID: id,
  });

  applicationToThisJob.length > 0
    ? res.status(200).json({
        applicationToThisJob,
        message: "here are the post's application ",
      })
    : res.status(404).send("no application found or something went wrong");
};

module.exports = {
  addJob,
  jobList,
  fileUpload,
  jobApply,
  getListByEmployer,
  getListByApplicant,
  getApplicationByPost,
};
