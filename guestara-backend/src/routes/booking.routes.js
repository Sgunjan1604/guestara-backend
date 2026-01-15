const router = require("express").Router();
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  const { item, date, startTime, endTime } = req.body;

  const conflict = await Booking.findOne({
    item,
    date,
    startTime,
    endTime
  });

  if (conflict) {
    return res.status(400).json({ message: "Slot already booked" });
  }

  const booking = await Booking.create(req.body);
  res.json(booking);
});

module.exports = router;
