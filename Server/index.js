const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on  ${port}`);
});
