const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('this is from ui', req.body)
  try {
    const admin = await Admin.findOne({ email });
    console.log('Entered password:', password);
    console.log('DB hash:', admin.password);
    console.log('Match?', await admin.matchPassword(password));
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
