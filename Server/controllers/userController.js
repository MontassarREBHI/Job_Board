const mongoose = require("mongoose");
const User = require("../models/users");

const getAllApplicants = async (req, res) => {
  const applicants = await User.find({ role: "applicant" });
  applicants.length
    ? res.status(200).json({ applicants, message: "here are all applicants!" })
    : res
        .status(400)
        .send("no registred applicants yet or something went wrong!");
};
const addUser = async (req, res) => {
  const { name, email, phone, address, CV, role, linkedIn, title } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res
      .status(200)
      .json({ existingUser, message: "User already exist" });
  try {
    const user = new User({
      name,
      email,
      phone,
      address,
      CV,
      role,
      title,
      linkedIn,
    });
    await user.save();

    res.status(200).json({ user, message: "User created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Something went wrong");
  }
};
const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (user) res.status(200).json({ user, message: "user exist!" });
  else res.status(400).send("no user found");
};

const updateUserProfile = async (req, res) => {
  const { name, email, phone, address, CV, role, title, linkedIn, photo } =
    req.body;
  const user = await User.findOneAndUpdate(
    { email },
    { name, phone, address, CV, role, title, linkedIn, photo },
    { new: true }
  );
  user
    ? res.status(200).json({ user, message: "updated successfully!" })
    : res.status(400).send("something wrong");
};

module.exports = {
  addUser,
  getUserByEmail,
  updateUserProfile,
  getAllApplicants,
};
