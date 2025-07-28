const mongoose = require('mongoose');

const FlatSchema = new mongoose.Schema({
  flatNumber: { type: String, required: true },       // e.g., "A-101"
  block: { type: String },                            // e.g., "Block A"
  maintenanceDue: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Flat belongs to one User
}, { timestamps: true });

module.exports = mongoose.model('Flat', FlatSchema);
