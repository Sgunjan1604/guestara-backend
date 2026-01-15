const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  tax_applicable: Boolean,
  tax_percentage: Number,
  is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
