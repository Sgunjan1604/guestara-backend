const express = require("express");
const Subcategory = require("../models/Subcategory");
const router = express.Router();

router.post("/", async (req, res) => {
  const sub = await Subcategory.create(req.body);
  res.status(201).json(sub);
});

router.get("/", async (req, res) => {
  const subs = await Subcategory.find({ is_active: true }).populate("category");
  res.json(subs);
});

module.exports = router;
