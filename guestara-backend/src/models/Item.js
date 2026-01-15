const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["STATIC", "DISCOUNTED", "TIERED", "DYNAMIC", "COMPLIMENTARY"],
    required: true
  },

  // STATIC / DISCOUNTED
  base_price: Number,

  // DISCOUNTED
  discount: {
    type: {
      type: String,
      enum: ["FLAT", "PERCENT"]
    },
    value: Number
  },

  // TIERED
  tiers: [
    {
      upto: Number,
      price: Number
    }
  ],

  // DYNAMIC
  time_windows: [
    {
      from: String,
      to: String,
      price: Number
    }
  ]
});

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory"
  },

  pricing: pricingSchema,

  availability: {
    days: [String],
    slots: [{ from: String, to: String }]
  },

  is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Item", itemSchema);
