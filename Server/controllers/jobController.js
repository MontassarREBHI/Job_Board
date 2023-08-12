const mongoose = require("mongoose");
const Job = require("../models/job");

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

module.exports = { addJob, jobList };
