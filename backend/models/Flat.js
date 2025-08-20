const mongoose = require('mongoose');

const FlatSchema = new mongoose.Schema({
  block: { type: String, enum: ["A", "B"], required: true },    // Only 2 blocks
  floor: { type: String, enum: ["G", "1", "2", "3"], required: true }, // Floors
  unit: { type: Number, min: 1, max: 6, required: true },       // 6 flats per floor

  flatNumber: { type: String, unique: true },                   // "A-G-1"

  status: { 
    type: String, 
    enum: ["vacant", "occupied", "to-let", "for-sale"], 
    default: "vacant" 
  },

  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maintenanceDue: { type: Number, default: 0 },
  lastPaidOn: { type: Date }
}, { timestamps: true });
console.log("inside mongo")
// Pre-save hook to auto-generate flatNumber
FlatSchema.pre("save", function(next) {
  this.flatNumber = `${this.block}-${this.floor}-${this.unit}`;
  next();
});

module.exports = mongoose.model("Flat", FlatSchema);