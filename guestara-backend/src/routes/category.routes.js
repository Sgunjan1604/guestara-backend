const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

// Create Category
router.post("/", async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

// List Categories (pagination + active only)
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const categories = await Category.find({ is_active: true })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  res.json(categories);
});

// Soft delete
router.patch("/:id/deactivate", async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { is_active: false });
  res.json({ message: "Category deactivated" });
});

module.exports = router;
