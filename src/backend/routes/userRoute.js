const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.get("/:userId", userController.getProfile);
router.put("/:userId", userController.updateProfile);
router.get("/", userController.getAllUsers);
router.delete("/:userId", userController.deleteUser);
module.exports = router;
