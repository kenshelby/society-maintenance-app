const User = require('../models/User');
const Flat = require('../models/Flat');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  try {
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, phone, role, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { emailOrPhone, password } = req.body;
  try {
    const user = await User.findOne({ $or: [
      { email: req.body.emailOrPhone }, 
      { phone: req.body.emailOrPhone }
    ]  });

    const { password, ...userWithoutPassword } = user.toObject();

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        user: userWithoutPassword,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsers = async (req, res) =>{
try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const flats = await User.find()
          .populate('flats', 'flatNumber')
          .skip(skip)
          .limit(limit);
    res.json({
      flats,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
} catch (error) {
  console.log(error)
  res.status(500).json({ message: 'Server error' });
}
}

module.exports = { registerUser, loginUser, getUsers };
