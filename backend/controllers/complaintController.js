const Complaint = require('../models/Complaint');


exports.addComplaint = async (req, res) => {
    try {
      const { title, description, category } = req.body;
      const complaint = await Complaint.create({ title, description, category, createdBy: req.user._id });
      res.status(201).json(complaint);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}

exports.getComplaint = async (req, res) => {
    try {
        const page = Number(req.body.page) || 1;
        const limit = Number(req.body.limit) || 10;
        const skip = (page - 1) * limit;
        const complaints = await Complaint.find()
        .sort( {creattedAt: -1} )
        .limit(limit)
        .skip(skip)
        .populate('createdBy', 'name email');
        res.json(complaints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.updateComplaintStatus = async (req, res) => {
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
}