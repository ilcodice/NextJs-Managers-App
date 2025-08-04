const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/mailer'); // your mail helper
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // keep secret in .env

// Helper to generate verification token with id + role, expires in 1 day
function generateVerificationToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
}

// Registration for Coders
exports.registerCoder = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: 'coder',
      is_verified: false,
    });

    await user.save();

    const token = generateVerificationToken(user);
    const verificationUrl = `http://localhost:3000/api/auth/verify?token=${token}`; 
    await sendVerificationEmail(email, verificationUrl);
    

    res.status(201).json({ message: 'Coder registered. Please verify your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Registration for Managers (almost the same as coders)
exports.registerManager = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: 'manager',
      is_verified: false,
    });

    await user.save();

    const token = generateVerificationToken(user);
    const verificationUrl = `http://localhost:3000/api/auth/verify?token=${token}`;
    await sendVerificationEmail(email, verificationUrl);

    res.status(201).json({ message: 'Manager registered. Please verify your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login for Coders
exports.loginCoder = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email, role: 'coder' });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    if (!user.is_verified) return res.status(401).json({ message: 'Email not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Coder logged in', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login for Managers
exports.loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email, role: 'manager' });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    if (!user.is_verified) return res.status(401).json({ message: 'Email not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: 'Manager logged in', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
