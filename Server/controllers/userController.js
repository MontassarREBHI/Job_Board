const mongoose = require("mongoose");
const User = require("../models/users");

const addUser = async (req, res) => {
  const { name, email, phone, address, CV, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(200).json({existingUser, message: "User already exist" });
  try {
    const user = new User({ name, email, phone, address, CV, role });
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
  const { name, email, phone, address, CV, role } = req.body;
  const user = await User.findOneAndUpdate(
    { email },
    { name, phone, address, CV, role },
    { new: true }
  );
  user
    ? res.status(200).json({ user, message: "updated successfully!" })
    : res.status(400).send("something wrong");
};

module.exports = { addUser, getUserByEmail, updateUserProfile };
