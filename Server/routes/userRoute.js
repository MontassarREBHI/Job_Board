const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .post(userController.addUser)
  .get(userController.getAllApplicants);
router.get("/:email", userController.getUserByEmail);
router.put("/", userController.updateUserProfile);
module.exports = router;
