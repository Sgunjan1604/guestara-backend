const express = require("express");
const Item = require("../models/Item");
const calculatePrice = require("../services/pricing.service");
const router = express.Router();

// CREATE ITEM
router.post("/", async (req, res) => {
  try {
    const { pricing } = req.body;

    if (!pricing || !pricing.type) {
      return res.status(400).json({
        error: "Pricing type is required"
      });
    }

    // STATIC validation
    if (pricing.type === "STATIC" && pricing.base_price == null) {
      return res.status(400).json({
        error: "Static pricing must include base_price"
      });
    }

    // DISCOUNTED validation
    if (
      pricing.type === "DISCOUNTED" &&
      (!pricing.base_price || !pricing.discount)
    ) {
      return res.status(400).json({
        error: "Discounted pricing requires base_price and discount"
      });
    }

    // TIERED validation
    if (
      pricing.type === "TIERED" &&
      !Array.isArray(pricing.tiers)
    ) {
      return res.status(400).json({
        error: "Tiered pricing requires tiers array"
      });
    }

    // DYNAMIC validation
    if (
      pricing.type === "DYNAMIC" &&
      !Array.isArray(pricing.time_windows)
    ) {
      return res.status(400).json({
        error: "Dynamic pricing requires time_windows"
      });
    }

    const item = await Item.create(req.body);
    res.status(201).json(item);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// SEARCH & FILTER ITEMS
router.get("/", async (req, res) => {
  const {
    search,
    minPrice,
    maxPrice,
    category,
    activeOnly = true,
    page = 1,
    limit = 10,
    sortBy = "name",
    order = "asc",
  } = req.query;

  let query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  if (activeOnly === "true") {
    query.is_active = true;
  }

  const items = await Item.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ [sortBy]: order === "asc" ? 1 : -1 });

  res.json(items);
});

// REQUIRED PRICE ENDPOINT
router.get("/:id/price", async (req, res) => {
  const item = await Item.findById(req.params.id);
  const price = await calculatePrice(
    item,
    req.query.quantity,
    req.query.time
  );
  res.json(price);
});
// Get available slots
router.get("/:id/availability", async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item.availability) {
    return res.json({ message: "Item not bookable" });
  }
  res.json(item.availability);
});
router.patch("/:id/pricing", async (req, res) => {
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    { pricing: req.body.pricing },
    { new: true }
  );
  res.json(item);
});


module.exports = router;
