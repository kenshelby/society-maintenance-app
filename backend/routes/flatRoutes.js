const express = require('express');
const Flat = require('../models/Flat');
const User = require('../models/User');

const router = express.Router();

// Add a new flat for a user
router.post('/:userId', async (req, res) => {
  try {
    const { flatNumber, block, maintenanceDue } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create flat
    const flat = await Flat.create({
      flatNumber,
      block,
      maintenanceDue,
      owner: user._id,
    });

    // Link flat to user
    user.flats.push(flat._id);
    await user.save();

    res.status(201).json(flat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all flats
router.get('/', async (req, res) => {
  try {
    const flats = await Flat.find().populate('owner', 'name email');
    res.json(flats);
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
