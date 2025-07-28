const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Generic login for Admin and User
exports.login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // 1. Check Admin by username
    if (username) {
      const admin = await Admin.findOne({ username });
      if (admin && (await admin.matchPassword(password))) {
        return res.json({
          token: generateToken(admin._id, 'admin'),
          role: 'admin',
          name: admin.username,
        });
      }
    }

    // 2. Check User by email
    if (email) {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          token: generateToken(user._id, 'user'),
          role: 'user',
          name: user.name,
        });
      }
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
