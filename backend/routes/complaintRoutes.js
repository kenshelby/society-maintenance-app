const express = require('express');
const Complaint = require('../models/Complaint');
const router = express.Router();

// Create a new complaint
router.post('/', async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const complaint = await Complaint.create({ title, description, category, createdBy: req.user._id });
    res.status(201).json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('createdBy', 'name email');
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update complaint status (e.g., mark as resolved)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status;
    await complaint.save();

    res.json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
