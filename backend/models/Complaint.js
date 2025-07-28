const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a complaint title'],
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ['Lift', 'Water', 'Electricity', 'Security', 'Other'],
      default: 'Other',
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Resolved'],
      default: 'Open',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Optional: If you want to track which user raised it
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;
