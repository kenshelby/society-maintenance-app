const express = require('express');
const Flat = require('../models/Flat');
const User = require('../models/User');

const router = express.Router();

// Add a new flat for a user
router.post('/', async (req, res) => {
  try {
    const { block, floor, unit, maintenanceDue, status } = req.body;
console.log("inside flatRoutes.js")
console.log(req.body)
console.log({ block, floor, unit, maintenanceDue, status })
    const flat = await Flat.create({
      block,
      floor,
      unit,
      maintenanceDue,
      status: status || 'vacant'   // ✅ take passed status, else default vacant
    });
console.log("after create method")
    res.status(201).json(flat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all flats
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Flat.countDocuments();
    const flats = await Flat.find()
      .populate('owner', 'name email')
      .skip(skip)
      .limit(limit);

    res.json({
      flats,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all flats of a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('flats');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.flats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
