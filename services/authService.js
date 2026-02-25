
const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function findOrCreateUser(phone) {
  let user = await User.findOne({ phone });
  if (!user) {
    user = new User({ phone, isVerified: true, role: 'user' });
    await user.save();
  }
  return user;
}

function signToken(user) {
  return jwt.sign(
    { id: user._id, phone: user.phone, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

module.exports = {
  findOrCreateUser,
  signToken,
};
