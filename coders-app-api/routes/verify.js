const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');

// GET /verify?token=...
router.get('/verify', async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(400).send('<h1>Missing verification token</h1>');

  try {
    const payload = verifyToken(token); // { id, role }

    const user = await User.findById(payload.id);
    if (!user) return res.status(404).send('<h1>User not found</h1>');

    if (user.is_verified) {
      return res.send('<h1>Email already verified</h1>');
    }

    user.is_verified = true;
    await user.save();

    res.send('<h1>Email verified successfully!</h1>');
  } catch (error) {
    console.error(error);
    res.status(400).send('<h1>Invalid or expired token</h1>');
  }
});

module.exports = router;
