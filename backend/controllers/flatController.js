// controllers/flatController.js
const Flat = require('../models/Flat');
const User = require('../models/User');

// Add a new flat
exports.addFlat = async (req, res) => {
  try {
    const { block, floor, unit, maintenanceDue, status } = req.body;
    const flat = await Flat.create({
      block,
      floor,
      unit,
      maintenanceDue,
      status: status || 'vacant',
    });

    res.status(201).json(flat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all flats (with pagination)
exports.getFlats = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Flat.countDocuments();
    const flats = await Flat.find()
      .populate('owner', 'name email phone role')
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
};

// Get flats of a specific user
exports.getUserFlats = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('flats');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.flats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Claim a flat
exports.claimFlat = async (req, res) => {
  try {
    const flatId = req.params.id;
    const userId = req.user.id; // from JWT middleware

    const flat = await Flat.findById(flatId);
    if (!flat) return res.status(404).json({ message: 'Flat not found' });

    if (flat.owner) {
      return res.status(400).json({ message: 'Flat already claimed' });
    }

    flat.owner = userId;
    await flat.save();

    await User.findByIdAndUpdate(userId, { $push: { flats: flat._id } });

    res.json({ message: 'Flat claimed successfully', flat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
