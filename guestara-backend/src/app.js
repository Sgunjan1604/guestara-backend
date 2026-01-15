const express = require("express");
const app = express();

app.use(express.json());

app.use("/categories", require("./routes/category.routes"));
app.use("/subcategories", require("./routes/subcategory.routes"));
app.use("/items", require("./routes/item.routes"));
app.use("/bookings", require("./routes/booking.routes"));

module.exports = app;
