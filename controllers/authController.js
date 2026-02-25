// controllers/authController.js
const admin = require('../firebase'); 
const authService = require('../services/authService');

async function verifyOtp(req, res) {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: 'ID token is required' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const phone = decodedToken.phone_number;

    if (!phone) {
      return res.status(400).json({ error: 'Invalid Firebase token: phone number missing' });
    }

    let user = await authService.findOrCreateUser(phone);

    const token = authService.signToken(user);

    res.json({
      token,
      user: {
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid or expired ID token' });
  }
}

module.exports = {
  verifyOtp,
};
