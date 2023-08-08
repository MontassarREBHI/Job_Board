const mongoose = require('mongoose');
const User = require('../models/users');

const addUser = async (req, res) => {
  const { name, email, phone, address, CV } = req.body;

  try {
    const user = new User({ name, email, phone, address, CV });
    await user.save();
    res.status(200).json({ user, message: 'User created successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Something went wrong');
  }
};

module.exports = { addUser };
