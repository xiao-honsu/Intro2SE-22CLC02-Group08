const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateRequest = require("../middleware/validateRequest");


router.post("/signup", authController.signup);
router.post("/login", validateRequest(["email", "password"]), authController.login); // Route xử lý đăng nhập
router.post("/choose_role", authController.choose_role);
module.exports = router;
