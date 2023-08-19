const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.addUser);
router.get("/:email",userController.getUserByEmail)
module.exports = router;
