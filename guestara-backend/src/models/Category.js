const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  tax_applicable: { type: Boolean, default: false },
  tax_percentage: Number,
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
