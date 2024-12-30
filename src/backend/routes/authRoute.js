const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateRequest = require("../middleware/validateRequest");


router.post("/signup", authController.signup);
router.post("/login", validateRequest(["email", "password"]), authController.login); 
router.post("/choose_role", authController.choose_role);
router.post("/forgot-password", authController.forgotPassword);
router.post("/update-password", authController.updatePassword);

module.exports = router;
