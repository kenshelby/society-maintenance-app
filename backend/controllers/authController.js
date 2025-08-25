const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Generic login for Admin and User
exports.login = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    // 1️⃣ Check Admin by email
    const admin = await Admin.findOne({ email: emailOrUsername });
    if (admin) {
      const isMatch = password === admin.password; // or bcrypt.compare(password, admin.password) if hashed
      if (isMatch) {
        return res.json({
          token: generateToken(admin._id, 'admin'),
          role: 'admin',
          name: admin.username,
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    // 2️⃣ Check User by email or phone
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { phone: emailOrUsername }]
    });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        token: generateToken(user._id, 'user'),
        role: 'user',
        name: user.name,
      });
    }

    // 3️⃣ If neither matched
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
