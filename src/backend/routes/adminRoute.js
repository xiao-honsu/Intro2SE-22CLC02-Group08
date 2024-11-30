const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");


router.get("/:adminId", adminController.getProfile);
module.exports = router;
