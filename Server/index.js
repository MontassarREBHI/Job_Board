const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const jobRoute = require("./routes/jobRoute");
const app = express();
// Middleware
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/job", jobRoute);
// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// connect to MONGODB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(port, () => {
  console.log(`Server is listening on  ${port}`);
});
