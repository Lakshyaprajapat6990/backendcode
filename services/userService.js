const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function getAllUsers() {
  return await User.find();
}

async function getUserById(id) {
  return await User.findById(id);
}

async function createUser(data) {
  const user = new User(data);
  return await user.save();
}

async function updateUser(id, data) {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

async function adminLoginService(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "admin") {
    throw new Error("Access denied. Not an admin.");
  }

  if (password !== user.password) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user: { id: user._id, email: user.email, role: user.role } };
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  adminLoginService,
};
