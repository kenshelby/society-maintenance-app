const express = require('express');
const { addComplaint, getComplaint, updateComplaintStatus } = require('../controllers/complaintController');
const router = express.Router();

// Create a new complaint
router.post('/', addComplaint);

// Get all complaints
router.get('/', getComplaint);

// Update complaint status (e.g., mark as resolved)
router.put('/:id/status', updateComplaintStatus);

module.exports = router;
