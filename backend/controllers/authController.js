const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Generic login for Admin and User
exports.login = async (req, res) => {
  const { email, username, password } = req.body;
console.log('inside authcontroller')
  try {
    // 1. Check Admin by username
    if (email) {
      console.log('inside username', email)
      const admin = await Admin.findOne({ email });
      console.log('after admin check', admin.password)
      console.log('password', password)
      console.log('admin.password ==== password', password === admin.password)
      if (admin && password === admin.password) {  //await bcrypt.compare(password, admin.password)    
        console.log('entered')  
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
